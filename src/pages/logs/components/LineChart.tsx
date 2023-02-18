import { useCallback, useMemo } from 'react';

interface IProps {
  height: number;
  width: number;
  data: [[number, string]];
}

const Line = ({
  points,
  color = '#ccc',
  strokeWidth = 1,
}: {
  points: string;
  color?: string;
  strokeWidth?: number | string;
}) => {
  return (
    <polyline
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      points={points}
    />
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
  const yGrid = useGrid(height, 4);
  const xGrid = useGrid(width, 4);
  return (
    <>
      <small>
        min: {minY} | max: {maxY}
      </small>
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${height} ${width}`}
      >
        {yGrid.map((item) => (
          <Line
            color={'var(--bg-color-secondary)'}
            strokeWidth={0.2}
            points={`0,${item} ${width},${item}`}
          />
        ))}
        {xGrid.map((item) => (
          <Line
            color={'var(--bg-color-secondary)'}
            strokeWidth={0.2}
            points={`${item},0 ${item},${height}`}
          />
        ))}
        {data.map(([item, key], index) => (
          <Line
            key={key}
            color={'var(--bg-color-secondary)'}
            points={`${getXCoord(index)},${getYCoord(item)} ${getXCoord(
              index + 1
            )}, ${getYCoord(data[index + 1]?.[0] || data[index][0])}`}
          />
        ))}
      </svg>
    </>
  );
}

export default LineChart;

function useGrid(size: number, maxLines: number) {
  const grid = useMemo(() => {
    let i = 0;
    const widthPiece = size / maxLines;
    const result = [];

    while (i <= maxLines) {
      result.push(widthPiece * i);
      i++;
    }

    return result;
  }, [size, maxLines]);
  return grid;
}
