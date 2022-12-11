import React, { useCallback, useState } from 'react';
import { convertDate } from '../../utils';
import Calendar from '../Calendar';
import Card from '../Card';
import Input from '../Input';
import './style.scss';

export interface IDatePicker
  extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value' | 'onChange'
  > {
  fullWidth?: boolean;
  value?: Date | string | number;
  onChange?: (date: Date) => void;
}

const DatePicker = (props: IDatePicker) => {
  const { fullWidth = false, value, onChange, ...otherProps } = props;

  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<Date>(value ? convertDate(value) : new Date());

  const onCalendarChange = useCallback((date: Date) => {
    console.log('date', date);
    setCurrentValue(date)
    setOpen(false);
  }, []);

  return (
    <>
      <div data-smv-date-picker data-full-width={fullWidth} data-open={open} {...otherProps}>
        <Input
          value={currentValue.toLocaleDateString()}
          fullWidth
          readOnly
          onClick={() => setOpen(!open)}
          placeholder="dd-mm-yyyy"
        />
        <Card className="calendar">
          <Calendar  value={value} onChange={onCalendarChange} />
        </Card>
      </div>
    </>
  );
};

export default DatePicker;
