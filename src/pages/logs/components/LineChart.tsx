import { useCallback, memo } from 'react';

interface IProps {
	height: number;
	width: number;
	data: [[number, string]];
}

const Line = ({ points }: { points: string }) => {
	return (
		<polyline fill='none' stroke={'#ccc'} strokeWidth='1' points={points} />
	);
};

function LineChart({ height = 200, width = 200, data }: IProps) {
	const maxY = Math.max(...data.map((item) => item[0]));
	const minY = Math.min(...data.map((item) => item[0]));
	const getYCoord = useCallback(
		(number: number) => height - ((number - minY) / (maxY - minY)) * height,
		[data]
	);
	const getXCoord = useCallback(
		(index: number) => {
			const ratio = (index + 1) / data.length;
			return ratio * width;
		},
		[data]
	);
	return (
		<svg
			width={width}
			height={height}
			xmlns='http://www.w3.org/2000/svg'
			viewBox={`0 0 ${height} ${width}`}
		>
			{data.map(([item, key], index) => (
				<Line
					key={key}
					points={`${getXCoord(index)},${getYCoord(item)} ${getXCoord(
						index + 1
					)}, ${getYCoord(data[index + 1]?.[0] || data[index][0])}`}
				/>
			))}
		</svg>
	);
}

export default LineChart;
