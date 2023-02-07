import { memo, useRef } from 'react';
import { Alert, Observe, Subscription } from '../interfaces';
import ILog from '../interfaces/Log';
import { useVirtualizer } from '@tanstack/react-virtual';

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

function List({ logs }: { logs: ILog[] }) {
	const logsRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: logs.length,
		getScrollElement: () => logsRef.current,
		estimateSize: () => 15,
	});

	const items = virtualizer.getVirtualItems();

	return (
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
						{(logs[virtualRow.index].action === 'subscription' && (
							<Log.Subscription {...logs[virtualRow.index].data} />
						)) ||
							(logs[virtualRow.index].action === 'alert' && (
								<Log.Alert {...logs[virtualRow.index].data} />
							)) ||
							(logs[virtualRow.index].action === 'observe' && (
								<Log.Observe {...logs[virtualRow.index].data} />
							)) ||
							JSON.stringify(logs[virtualRow.index])}
					</li>
				))}
			</ul>
		</div>
	);
}

export default List;
