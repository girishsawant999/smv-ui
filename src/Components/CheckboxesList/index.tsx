import React from 'react';
import Ripple from '../Ripple';
import Typography from '../Typography';
import './style.scss';

interface listDataProps {
  name: string;
  label: string;
  value: string;
}

interface ICheckboxesProps {
  selectedValues: listDataProps[];
  // eslint-disable-next-line no-unused-vars
  setSelectedValues: <T extends listDataProps>(obj: T[]) => void;
  selectMultiple?: boolean;
  listData: unknown;
}

const CheckboxesList = <T extends listDataProps>(props: ICheckboxesProps): JSX.Element => {
  const { selectedValues, setSelectedValues, selectMultiple = false } = props;
  const listData = props.listData as T[];

  const _values = selectedValues.map((_) => _.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, obj: T): void => {
    e.stopPropagation();
    const isChecked = e.target.checked;

    if (isChecked) {
      const _selectedValues = [...selectedValues];
      if (selectMultiple) {
        _selectedValues.push(obj);
      } else {
        _selectedValues.splice(0, _selectedValues.length, obj);
      }
      setSelectedValues(_selectedValues);
    } else {
      const filteredValues = selectedValues.filter((item) => item.value !== obj.value);
      setSelectedValues(filteredValues);
    }
  };

  return (
    <>
      {listData.map((item) => (
        <div key={item.name} data-smv-checkbox>
          <span className="checkbox-input">
            <input
              type="checkbox"
              checked={_values.includes(item.value)}
              id={item.name}
              value={item.value}
              onChange={(e): void => handleChange(e, item)}
            />
            <span className="check-box"></span>
          </span>
          <label htmlFor={item.name}>
            <Typography weight="semi-bold" font="primary" size={14} variant="p">
              {item.label}
            </Typography>
          </label>
          <Ripple />
        </div>
      ))}
    </>
  );
};

export default CheckboxesList;
