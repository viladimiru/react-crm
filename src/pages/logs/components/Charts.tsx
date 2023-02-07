import { Pair } from '../interfaces';
import LineChart from './LineChart';

function Charts({ pairs }: { pairs: Pair[] }) {
	return (
		<>
			<div className='logs__charts'>
				{pairs.map((pair: any) => (
					<div className='logs__chart'>
						<h3>{pair.symbol}</h3>
						<LineChart height={300} width={300} data={pair.data} />
					</div>
				))}
			</div>
		</>
	);
}

export default Charts;
