import React, { memo, useEffect, useState } from 'react';
import { Icons, VerticalSelect } from '../..';
import { clsx, convertDate, daysMap, getDateTimeStamp, monthMap } from '../../utils';
import Ripple from '../Ripple';
import Typography from '../Typography';
import './style.scss';

interface IDay {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}

export interface ICalendarConditionProps {
  minDate?: Date;
  maxDate?: Date;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  disableDates?: Date[];
}

export interface ICalendarProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    ICalendarConditionProps {
  defaultValue?: string | number | Date;
  value?: string | number | Date;
  onChange?: (val: Date) => void;
}

const Calendar = ({
  children,
  className = '',
  value,
  onChange,
  defaultValue = new Date(),
  minDate,
  maxDate,
  disablePastDates,
  disableFutureDates,
  disableDates,
  ...props
}: ICalendarProps): JSX.Element => {
  const initial = value ? convertDate(value) : convertDate(defaultValue);
  const todayTimestamp = getDateTimeStamp(new Date());

  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [monthDetails, setMonthDetails] = useState<IDay[]>([]);

  const getDayDetails = (args: {
    index: number;
    numberOfDays: number;
    firstDay: number;
    year: number;
    month: number;
  }) => {
    const date = args.index - args.firstDay;
    const day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
    const _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    const timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: daysMap[day],
    };
  };

  const getNumberOfDays = (year: number, month: number) => {
    return 40 - new Date(year, month, 40).getDate();
  };

  const getMonthDetails = (year: number, month: number) => {
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = getNumberOfDays(year, month);
    const monthArray: IDay[] = [];
    const rows = 6;
    let currentDay: IDay | null = null;
    let index = 0;
    const cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  };

  const isCurrentDay = (day: IDay) => {
    return day.timestamp === todayTimestamp;
  };

  const isSelectedDay = (day: IDay) => {
    return day.timestamp === selectedDay;
  };

  const isDayActive = (timestamp: number) => {
    if (disablePastDates && timestamp < todayTimestamp) {
      return false;
    }
    if (disableFutureDates && timestamp > todayTimestamp) {
      return false;
    }
    if (minDate && timestamp < getDateTimeStamp(minDate)) {
      return false;
    }
    if (maxDate && timestamp > getDateTimeStamp(maxDate)) {
      return false;
    }
    if (disableDates && disableDates.map((date) => getDateTimeStamp(date)).includes(timestamp)) {
      return false;
    }
    return true;
  };

  const onDateClick = (day: IDay) => {
    if (!isDayActive(day.timestamp)) return;
    setSelectedDay(day.timestamp);
  };

  const changeYear = (offset: number) => {
    setYear((_) => _ + offset);
  };

  const changeMonth = (offset: number) => {
    let _month = month + offset;
    if (_month === -1) {
      _month = 11;
      changeYear(-1);
    } else if (_month === 12) {
      _month = 0;
      changeYear(1);
    }
    setMonth(_month);
  };

  useEffect(() => {
    if (!defaultValue) return;
    const date = convertDate(defaultValue);
    const timestamp = getDateTimeStamp(date);
    if (!isDayActive(timestamp)) return;
    setSelectedDay(timestamp);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }, []);

  useEffect(() => {
    setMonthDetails(getMonthDetails(year, month));
  }, [year, month]);

  useEffect(() => {
    if (!value) return;
    const date = convertDate(value);
    const timestamp = getDateTimeStamp(date);
    if (!isDayActive(timestamp)) return;
    setSelectedDay(timestamp);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }, [value]);

  useEffect(() => {
    if (!selectedDay) return;
    onChange && onChange(convertDate(selectedDay));
  }, [selectedDay]);

  const YearsDropdown = () => {
    const createYearsArray = (startYear = 1970, endYear = 2099) => {
      let years: number[] = [];
      for (let i = startYear; i <= endYear; i++) {
        years.push(i);
      }
      return years;
    };

    return (
      <VerticalSelect
        label="Year "
        name="year"
        setValue={(val) => setYear(parseInt(val))}
        value={year.toString()}
        options={createYearsArray().map((_) => ({
          label: _.toString(),
          value: _.toString(),
        }))}
        showSearch
        placeholder="Search for Year"
        className="calendar-select year-select"
      />
    );
  };

  const MonthsDropdown = () => {
    return (
      <VerticalSelect
        label="Month "
        name="month"
        setValue={(val) => setMonth(parseInt(val))}
        value={month.toString()}
        options={monthMap.map((month, index) => ({
          label: month,
          value: index.toString(),
        }))}
        showSearch
        placeholder="Search for Month"
        className="calendar-select month-select"
      />
    );
  };

  const renderCalendar = () => {
    let days = monthDetails.map((day, index) => {
      return (
        <div
          className={
            'day-container ' +
            (day.month !== 0 || !isDayActive(day.timestamp) ? ' disabled' : '') +
            (isCurrentDay(day) ? ' current-day' : '') +
            (isSelectedDay(day) ? ' selected-day' : '')
          }
          key={index}
        >
          <button
            disabled={day.month !== 0 || !isDayActive(day.timestamp)}
            onClick={() => onDateClick(day)}
          >
            <Typography variant="span" size={12}>
              {day.date}
            </Typography>
            <Ripple />
          </button>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="head">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => (
            <div key={i} className="week-name">
              <Typography size={10} color="secondary" weight="semi-bold">
                {d}
              </Typography>
            </div>
          ))}
        </div>
        <div className="body">{days}</div>
      </div>
    );
  };

  return (
    <div className={clsx('smv-calendar', className)} {...props}>
      <div className="head">
        <div className="head-left">
          <button className="change-month-btn" onClick={() => changeMonth(-1)}>
            <Ripple />
            <Icons.LeftArrowIcon height={16} width={16} />
          </button>
        </div>
        <div className="head-center">
          <MonthsDropdown />
          <YearsDropdown />
        </div>
        <div className="head-right">
          <button className="change-month-btn right" onClick={() => changeMonth(1)}>
            <Ripple />
            <Icons.LeftArrowIcon height={16} width={16} />
          </button>
        </div>
      </div>

      <div className="body">{renderCalendar()}</div>
    </div>
  );
};

export default memo(Calendar);
