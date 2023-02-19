import RSelect, { Props, StylesConfig } from 'react-select';

function Select(props: Props) {
	return (
		<RSelect
			className="r-select"
			classNamePrefix="r-select"
			styles={selectStyles}
			{...props}
		/>
	);
}

export default Select;

const selectStyles: StylesConfig = {
	singleValue: (styles) => ({
		...styles,
		color: 'var(--text-color)',
	}),
	control: (styles) => ({
		...styles,
		backgroundColor: 'var(--bg-color-opacity)',
		borderColor: 'var(--bg-color-secondary)',
		'&:hover': {
			borderColor: 'var(--bg-color-secondary)',
			cursor: 'pointer',
		},
		outline: 'none',
		boxShadow: 'none',
	}),
	indicatorsContainer: (styles) => ({
		...styles,
	}),
	dropdownIndicator: (styles) => ({
		...styles,
		color: 'var(--text-color)',
		'&:hover': {
			color: 'var(--text-color)',
		},
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		color: 'var(--text-color)',
	}),
	menu: (styles) => ({
		...styles,
		backgroundColor: 'var(--bg-color)',
		'&:active': {
			color: 'red',
		},
	}),
	option: (styles, { isSelected, isDisabled }) => ({
		...styles,
		color: 'var(--text-color)',
		backgroundColor: isSelected ? 'var(--bg-active)' : 'transparent',
		'&:hover': {
			cursor: isDisabled ? 'default' : 'pointer',
			backgroundColor: isSelected ? 'var(--bg-active)' : 'var(--bg-hover)',
		},
	}),
};
