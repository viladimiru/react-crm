import { useCallback } from 'react';

function LineChart({ height = 200, width = 200, data = [],}) {
	const maxY = Math.max(...data.map(item => item[0]));
	const minY = Math.min(...data.map(item => item[0]));
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
				<polyline
					key={key}
					fill='none'
					stroke={'#ccc'}
					strokeWidth='1'
					points={`${getXCoord(index)},${getYCoord(item)} ${getXCoord(
						index + 1
					)}, ${getYCoord(data[index + 1]?.[0] || data[index][0])}`}
				/>
			))}
		</svg>
	);
}

export default LineChart;
