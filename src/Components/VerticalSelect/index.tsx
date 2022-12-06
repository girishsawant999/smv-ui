import React, { useEffect, useRef, useState } from 'react';
import { clsx } from '../../utils';
import Ripple from '../Ripple';
import Typography from '../Typography';
import './style.scss';

interface IOption {
  label: string;
  value: string;
  icon?: string;
  key?: string;
}

export interface IVerticalSelect {
  label: string;
  name: string;
  options: IOption[];
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  defaultOpen?: boolean;
  showSearch?: boolean;
}
const VerticalSelect = ({
  label,
  name,
  options,
  value,
  setValue,
  disabled,
  placeholder = '',
  defaultOpen = false,
  showSearch = false,
}: IVerticalSelect): JSX.Element => {
  const [open, setOpen] = useState(disabled ? false : defaultOpen);
  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    } else {
      inputRef && inputRef.current && inputRef.current.focus();
    }
  }, [open]);

  const handleOnClick = () => {
    if (!open && disabled) return;
    if (!open) {
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
        'div[data-vertical-select][data-show="true"]'
      );

      elements.forEach(
        (element) => element && (element as HTMLElement).querySelector('div')?.click()
      );
    }
    setOpen(!open);
  };

  const onOptionClick = (option: IOption) => {
    setValue(option.value);
    const element: HTMLElement | null = document.querySelector(
      'div[data-vertical-select][data-show="false"][data-selected="false"] > div'
    );
    setTimeout(() => element && element.click(), 200);
    setOpen(false);
  };

  const _options = options.filter(
    (_) => !searchQuery || _.label.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );
  const selectedOption = options.find((option) => option.value === value);
  return (
    <div
      data-vertical-select
      data-show={open}
      data-selected={Boolean(selectedOption)}
      data-disabled={disabled}
      className={clsx('root-vertical-select')}
    >
      <div className={clsx('titleContainer')} tabIndex={0} role="button" onClick={handleOnClick}>
        <Ripple overflow />
        <Typography variant="label" size={open ? 18: 16} weight="semi-bold">{label}</Typography>
        {selectedOption && (
          <Typography size={14} variant="p" weight="semi-bold">
            <span className={clsx('optionIcon')}>
              {selectedOption.icon && <img src={selectedOption.icon} alt={selectedOption.label} />}
            </span>
            {selectedOption.label}
          </Typography>
        )}
      </div>

      <div className={clsx('content')}>
        {showSearch && (
          <input
            autoFocus
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            id={(name || label).toLowerCase()}
            name={name}
            placeholder={placeholder}
          />
        )}

        <div className={clsx('optionsContainer')}>
          {_options.map((option, index) => {
            const iconsExist = options.some((option) => option.icon);

            return (
              <div
                className={clsx('option')}
                style={{ '--option-index': index } as React.CSSProperties}
                tabIndex={0}
                role="button"
                onClick={() => onOptionClick(option)}
                key={`${option.label}-${index}`}
              >
                <Ripple />
                <span className={clsx('optionIcon')}>
                  {option.icon && <img src={option.icon} alt={option.label} />}
                  {iconsExist && !option.icon && <span className={clsx('mockImage')}></span>}
                </span>
                <Typography size={16} variant="p" weight="regular">
                  {option.label}
                </Typography>
              </div>
            );
          })}

          {_options.length === 0 && (
            <Typography size={14} variant="p" weight="light" className='no-result-found'>
              No options available {searchQuery && `for "${searchQuery}"`}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalSelect;
