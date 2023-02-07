import useWebSocket from 'react-use-websocket';
import { useState, memo, lazy, Suspense } from 'react';
import dayjs from 'dayjs';
import { ILog, Pair } from './interfaces';
import Select from '../../components/Select';

// const WS_URL = 'wss://www.flamingo-house.top/websocket'
const WS_URL = 'ws://localhost:3030/';
const maxLogList = 2000;
const maxPairLogs = 1800;
const selectOptions = [
	{
		value: 'list',
		label: 'List',
	},
	{
		value: 'chart',
		label: 'Chart',
	},
];

const List = lazy(() => import('./components/List'));
const Charts = lazy(() => import('./components/Charts'));

function Logs() {
	const [viewType, setViewType] = useState(selectOptions[0]);
	const [logs, setLogs] = useState<ILog[]>([]);
	const [pairLogs, setPairLogs] = useState<Pair[]>([]);

	useWebSocket(WS_URL, {
		onMessage: async (e: MessageEvent) => {
			setLogs((prev) => {
				let data = JSON.parse(e.data) as ILog[];
				if (!Array.isArray(data)) {
					data = [data];
				}
				data.forEach((item: ILog) => {
					item.timestamp = dayjs(item.timestamp).format(
						'YYYY-MM-DD HH:mm:ss:SSS'
					);
				});
				const pairs = data.filter((item) => item.action === 'observe');
				if (pairs.length) {
					updatePairLogs(pairs);
				}
				if (logs.length > maxLogList) {
					const sliceSize = maxLogList - data.length;
					return [...data, ...prev.slice(0, sliceSize)];
				}
				return [...data, ...prev];
			});
		},
	});

	const updatePairLogs = (pairs: ILog[]) => {
		setPairLogs((prevPairs) => {
			let payload = JSON.parse(JSON.stringify(prevPairs));
			pairs.forEach((item) => {
				let state = payload.find((p: any) => p.symbol === item.data.symbol);
				if (!state) {
					state = {
						symbol: item.data.symbol,
						data: [],
					};
					payload.push(state);
				}
				state.data.push([item.data.markPrice, item.uid]);
				if (state.data.length > maxPairLogs) {
					state.data.splice(0, state.data.length - maxPairLogs);
				}
			});
			return payload;
		});
	};

	return (
		<>
			<div className='logs-wrap'>
				<Select
					className='r-select'
					classNamePrefix='r-select'
					value={viewType}
					options={selectOptions as []}
					onChange={(item) => setViewType(item as any)}
				/>
				<Suspense fallback={<span>loading</span>}>
					{viewType.value === 'list' ? (
						<List logs={logs} />
					) : (
						<Charts pairs={pairLogs} />
					)}
				</Suspense>
			</div>
		</>
	);
}

export default memo(Logs);
