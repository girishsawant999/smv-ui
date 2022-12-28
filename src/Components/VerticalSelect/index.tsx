import React, { memo, useEffect, useRef, useState } from "react";
import useDelayMount from "../../hooks/useDelayMount";
import { clsx } from "../../utils";
import Input from "../Input";
import Ripple from "../Ripple";
import Typography from "../Typography";
import "./style.scss";

interface IOption {
	label: string;
	value: string;
	icon?: string;
	key?: string;
	is_supported?: boolean;
}

export interface IVerticalSelect extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string;
	name: string;
	options: IOption[];
	value: string;
	setValue: (value: string) => void;
	disabled?: boolean;
	placeholder?: string;
	defaultOpen?: boolean;
	showSearch?: boolean;
	renderNotSupported?: (value: string) => React.ReactNode;
}
const VerticalSelect = ({
	label,
	name,
	options,
	value,
	setValue,
	disabled,
	placeholder = "",
	defaultOpen = false,
	showSearch = false,
	className = "",
	renderNotSupported,
	...otherProps
}: IVerticalSelect): JSX.Element => {
	const [open, setOpen] = useState(disabled ? false : defaultOpen);
	const [searchQuery, setSearchQuery] = useState("");
	const mounted = useDelayMount(open);

	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (!open) {
			setSearchQuery("");
		} else {
			inputRef && inputRef.current && inputRef.current.focus();
		}
	}, [open]);

	useEffect(() => {
		if (!mounted) return;
		const optionsContainer = document.querySelector('div[data-show="true"] .optionsContainer');
		if (!optionsContainer) return;
		const selected = optionsContainer.querySelector(".selected");
		if (!selected) return;
		optionsContainer.scrollTop = (selected as HTMLElement).offsetTop - 148;
	}, [mounted]);

	const handleOnClick = () => {
		if (!open && disabled) return;
		if (!open) {
			const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
				'div[data-vertical-select][data-show="true"]'
			);

			elements.forEach((element) => element && (element as HTMLElement).querySelector("div")?.click());
		}
		setOpen(!open);
	};

	const onOptionClick = (option: IOption) => {
		setValue(option.value);
		if ("is_supported" in option && option.is_supported === false) return;

		const element: HTMLElement | null = document.querySelector(
			'div[data-vertical-select][data-show="false"][data-selected="false"] > div'
		);
		setTimeout(() => {
			element && element.click();
			setOpen(false);
		}, 200);
	};

	const _options = options.filter(
		(_) => !searchQuery || _.label.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
	);
	const selectedOption = options.find((option) => option.value === value);
	const iconsExist = options.some((option) => option.icon);

	const selectedOptionForNotSupported = selectedOption ? selectedOption : _options.length === 1 ? _options[0] : false;
	const notSupportedContainer =
		renderNotSupported &&
		selectedOptionForNotSupported &&
		"is_supported" in selectedOptionForNotSupported &&
		!selectedOptionForNotSupported.is_supported &&
		renderNotSupported(selectedOptionForNotSupported.value);

	return (
		<div
			data-vertical-select
			data-show={open && !disabled}
			data-selected={Boolean(selectedOption)}
			data-disabled={disabled}
			className={clsx("root-vertical-select", className)}
			{...otherProps}>
			<div className={clsx("titleContainer")} tabIndex={0} role="button" onClick={handleOnClick}>
				<Ripple overflow />
				<Typography variant="label" size={open ? 18 : 16} weight="semi-bold">
					{label}
				</Typography>
				{selectedOption && (
					<Typography size={14} variant="p" weight="semi-bold">
						<span className={clsx("optionIcon")}>
							{selectedOption.icon && <img src={selectedOption.icon} alt={selectedOption.label} />}
						</span>
						{selectedOption.label}
					</Typography>
				)}
			</div>

			<div className={clsx("content")}>
				{showSearch && open && (
					<Input
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

				<div className={clsx("optionsContainer")}>
					{/* 
        {selectedOption && <div
                className={clsx('option')}
                style={{ '--option-index': 0 } as React.CSSProperties}
                tabIndex={0}
                role="button"
                onClick={() => setValue('')}
                key={`clear`}
              >
                <Ripple />
                <span className={clsx('optionIcon')}>
                  {iconsExist && <span className={clsx('mockImage transparent')}></span>}
                </span>
                <Typography size={16} variant="p" weight="regular">
                 Clear option
                </Typography>
              </div>} */}

					{!notSupportedContainer &&
						_options.map((option, index) => {
							const selectedOptionIndex = _options.findIndex((_) => _.value === value);
							return (
								<div
									className={clsx("option", value === option.value && "selected")}
									style={{ "--option-index": index - selectedOptionIndex + 1 } as React.CSSProperties}
									tabIndex={0}
									role="button"
									onClick={() => onOptionClick(option)}
									key={`${option.label}-${index}`}>
									<Ripple />
									<span className={clsx("optionIcon")}>
										{option.icon && <img src={option.icon} alt={option.label} />}
										{iconsExist && !option.icon && <span className={clsx("mockImage")}></span>}
									</span>
									<Typography size={16} variant="p" weight="regular">
										{option.label}
									</Typography>
								</div>
							);
						})}

					{notSupportedContainer && notSupportedContainer}

					{_options.length === 0 && (
						<Typography size={14} variant="p" weight="regular" className="no-result-found">
							No options available {searchQuery && `for "${searchQuery}"`}
						</Typography>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(VerticalSelect);
