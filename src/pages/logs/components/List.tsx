import { memo, useRef, useState, useMemo } from 'react';
import { Alert, Observe, Subscription } from '../interfaces';
import ILog from '../interfaces/Log';
import { useVirtualizer } from '@tanstack/react-virtual';
import Select from '../../../components/Select';
import { OnChangeValue } from 'react-select';

namespace Log {
	export const Subscription = memo((props: Subscription) => {
		return (
			<>
				Subscription | Pair: {props.pair} | isExists: {String(props.isExists)}
			</>
		);
	});
	export const Alert = memo((props: Alert) => {
		return (
			<>
				Alert | chatId: {props.chatId} | message: {props.message}
			</>
		);
	});
	export const Observe = memo((props: Observe) => {
		return (
			<>
				Observe | Pair: {props.symbol} | MarkPrice: {props.markPrice} |
				FundingRate: {props.fundingRate}
			</>
		);
	});
}

const filterOptions = [
	{
		value: 'all',
		label: 'All'
	},
	{
		value: 'observe',
		label: 'Observe'
	},
	{
		value: 'alert',
		label: 'Alert'
	},
	{
		value: 'subscription',
		label: 'Subscription'
	},
]

function List({ logs }: { logs: ILog[] }) {
	const logsRef = useRef<HTMLDivElement>(null);
	const [filter, setFilter] = useState<any>()

	const getFilteredLogs = useMemo(() => {
		if (filter && filter.value !== 'all') {
			return logs.filter(item => item.action === filter.value)
		}
		return logs
	}, [logs])

	const virtualizer = useVirtualizer({
		count: getFilteredLogs.length,
		getScrollElement: () => logsRef.current,
		estimateSize: () => 15,
	});

	const items = virtualizer.getVirtualItems();

	return (
		<>
			<Select placeholder='Filter by' value={filter} onChange={setFilter} options={filterOptions} />
			<div className='logs' ref={logsRef}>
				<ul
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						width: '100%',
						position: 'relative',
					}}
				>
					{items.map((virtualRow) => (
						<li
							key={logs[virtualRow.index].uid}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: `${virtualRow.size}px`,
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							<small>{logs[virtualRow.index].timestamp}</small>
							{(getFilteredLogs[virtualRow.index].action === 'subscription' && (
								<Log.Subscription {...getFilteredLogs[virtualRow.index].data} />
							)) ||
								(getFilteredLogs[virtualRow.index].action === 'alert' && (
									<Log.Alert {...getFilteredLogs[virtualRow.index].data} />
								)) ||
								(getFilteredLogs[virtualRow.index].action === 'observe' && (
									<Log.Observe {...getFilteredLogs[virtualRow.index].data} />
								)) ||
								JSON.stringify(getFilteredLogs[virtualRow.index])}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default List;
