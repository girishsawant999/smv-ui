import React, { memo, useEffect, useState } from 'react';
import { Icons, VerticalSelect, When } from '../..';
import { CrossIcon } from '../../Icons';
import {
  clsx,
  convertDate,
  daysMap,
  formatDate,
  formatDateRange,
  getDateTimeStamp,
  monthMap
} from '../../utils';
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
  onRangeChange?: (range: Date[]) => void;
  isRangePicker?: boolean;
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
  isRangePicker = false,
  onRangeChange,
  ...props
}: ICalendarProps): JSX.Element => {
  const initial = value ? convertDate(value) : convertDate(defaultValue);
  const todayTimestamp = getDateTimeStamp(new Date());

  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<number[]>([]);

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

  const isInRange = (day: IDay) => {
    if (range.length < 2) return false;
    if (range[0] <= day.timestamp && range[1] >= day.timestamp) return true;
    return false;
  };

  const isRangeStartDay = (day: IDay) => {
    if (range.length < 2) return false;
    if (range[0] === day.timestamp) return true;
    return false;
  };

  const isRangeEndDay = (day: IDay) => {
    if (range.length < 2) return false;
    if (range[1] === day.timestamp) return true;
    return false;
  };

  const setTimeStamp = (timestamp: number) => {
    if (!isDayActive(timestamp)) return;

    if (isRangePicker) {
      if (range.length === 2) {
        setRange([timestamp]);
      } else if (range[0] !== timestamp) {
        setRange([...range, timestamp].sort((a, b) => a - b));
      }
    }
    setSelectedDay(timestamp);
  };

  const onClear = () => {
    setSelectedDay(undefined);
    setRange([]);
  };

  const onDateClick = (day: IDay) => {
    setTimeStamp(day.timestamp);
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
  }, []);

  useEffect(() => {
    if (!value) return;
    const date = convertDate(value);
    const timestamp = getDateTimeStamp(date);
    if (!isDayActive(timestamp)) return;
    setSelectedDay(timestamp);
  }, [value]);

  useEffect(() => {
    if (!selectedDay) return;
    const date = convertDate(selectedDay);
    if (!isRangePicker) {
      setYear(date.getFullYear());
      setMonth(date.getMonth());
    }
    onChange && onChange(convertDate(selectedDay));
  }, [selectedDay]);

  useEffect(() => {
    if (!isRangePicker) return;
    onRangeChange && onRangeChange(range.map((_) => convertDate(_)));
  }, [range]);

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

  const renderCalendar = (year: number, month: number) => {
    const monthDetails = getMonthDetails(year, month);
    let days = monthDetails.map((day, index) => {
      return (
        <div
          className={clsx(
            'day-container',
            (day.month !== 0 || !isDayActive(day.timestamp)) && 'disabled',
            isCurrentDay(day) && 'current-day',
            isSelectedDay(day) && 'selected-day',
            isInRange(day) && 'in-range',
            isRangeStartDay(day) && 'start-day',
            isRangeEndDay(day) && 'end-day'
          )}
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

  const formattedRange = formatDateRange(range.map((_) => convertDate(_)));
  const formattedSelected = selectedDay && formatDate(convertDate(selectedDay));
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

      <div className="sub-head">
        <div className="buttons-container">
          <button
            onClick={() => {
              const date = convertDate(todayTimestamp);
              setMonth(date.getMonth());
              setYear(date.getFullYear());
              setTimeStamp(todayTimestamp);
            }}
            className={clsx('today-btn', todayTimestamp === selectedDay && 'selected')}
          >
            <Typography variant="span" size={12}>
              Today
            </Typography>
            <Ripple />
          </button>
        </div>
        <div className="selected-values-container">
          <When isTrue={Boolean(isRangePicker && formattedRange)}>
            <Typography variant="span" size={12}>
              {formattedRange}
              <button onClick={onClear} className={clsx('clear-btn')}>
                <Typography variant="span" size={12}>
                  Clear
                </Typography>
                <Ripple />
              </button>
            </Typography>
          </When>

          <When isTrue={Boolean(!isRangePicker && formattedSelected)}>
            <Typography variant="span" size={12}>
              {formattedSelected}&nbsp;
              <span role="button" onClick={onClear} className="icon">
                <CrossIcon height={12} width={12} />
                <Ripple />
              </span>
            </Typography>
          </When>
        </div>
      </div>

      <div className="calendars">
        <div className="body">{renderCalendar(year, month)}</div>
        <When isTrue={Boolean(isRangePicker)}>
          <div className="body">{renderCalendar(year, month + 1)}</div>
        </When>
      </div>
    </div>
  );
};

export default memo(Calendar);
