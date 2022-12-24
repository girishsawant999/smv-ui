import { convertCountrySymbol } from "../../utils";

export interface IFlag {
	countrySymbol: string;
	width?: number;
	alt?: string;
	className?: string;
}

const Flag = (props: IFlag) => {
	const { width = 32, alt, countrySymbol, ...otherProps } = props;
	return (
		<img
			src={`https://flagcdn.com/${convertCountrySymbol(countrySymbol).toLowerCase()}.svg`}
			width={width}
			alt={alt || countrySymbol}
			{...otherProps}
		/>
	);
};

export default Flag;

