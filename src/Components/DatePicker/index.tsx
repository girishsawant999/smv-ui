import React, { useEffect, useState } from 'react';
import { convertDate } from '../../utils';
import Calendar, { ICalendarConditionProps } from '../Calendar';
import Card from '../Card';
import Input from '../Input';
import './style.scss';

export interface IDatePicker
  extends Omit<
      React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
      'value' | 'onChange' | 'defaultValue'
    >,
    ICalendarConditionProps {
  fullWidth?: boolean;
  value?: Date | string | number;
  defaultValue?: Date | string | number;
  onChange?: (date: Date) => void;
}

const DatePicker = (props: IDatePicker) => {
  const {
    fullWidth = false,
    defaultValue = new Date(),
    value,
    onChange,

    ...otherProps
  } = props;
  const initial = value ? convertDate(value) : convertDate(defaultValue);

  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<Date>(initial);

  const onCalendarChange = (date: Date) => {
    setCurrentValue(date);
    onChange && onChange(date);
    open && setOpen(false);
  };

  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!value) return;
    setCurrentValue(convertDate(value));
  }, [value]);

  return (
    <>
      <div data-smv-date-picker data-full-width={fullWidth} data-open={open} {...otherProps}>
        <Input
          {...otherProps}
          value={currentValue.toLocaleDateString()}
          fullWidth
          readOnly
          onClick={onInputClick}
          placeholder="dd/mm/yyyy"
        />
        <Card className="calendar">
          <Calendar {...otherProps} value={currentValue} onChange={onCalendarChange} />
        </Card>
      </div>
    </>
  );
};

export default DatePicker;
