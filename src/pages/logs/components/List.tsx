import { memo, useRef } from 'react';
import { Alert, Observe, Subscription } from '../interfaces';
import { useVirtual } from 'react-virtual';
import ILog from '../interfaces/Log';

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

function List({ logs }: {logs: ILog[]}) {
	const logsRef = useRef<HTMLDivElement>(null);

	useVirtual({
		parentRef: logsRef,
		size: 30,
	});
	
	return (
		<div className='logs' ref={logsRef}>
			<ul>
				{logs.map((item) => (
					<li key={item.uid}>
						<small>{item.timestamp}</small>
						{(item.action === 'subscription' && (
							<Log.Subscription {...item.data} />
						)) ||
							(item.action === 'alert' && <Log.Alert {...item.data} />) ||
							(item.action === 'observe' && <Log.Observe {...item.data} />) ||
							JSON.stringify(item)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default List;
