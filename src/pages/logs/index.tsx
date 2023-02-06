import useWebSocket from 'react-use-websocket';
import { useState, useRef, memo } from 'react';
import { EventWrapper } from './interfaces/EventWrapper';
import { Alert } from './interfaces/Alert';
import { Observe } from './interfaces/Observe';
import { Subscription } from './interfaces/Subscription';
import dayjs from 'dayjs';
import LineChart from './components/LineChart';
import { useVirtual } from 'react-virtual';

const WS_URL = 'wss://www.flamingo-house.top/websocket'
// const WS_URL = 'ws://localhost:3030/';
const maxLogList = 150;

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

type ILog = EventWrapper<Alert & Observe & Subscription & Error>;

const maxLogSize = 60;

function Logs() {
	const [logs, setLogs] = useState<ILog[]>([]);
	const [pairLogs, setPairLogs] = useState([]);
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
					setPairLogs((prev) => {
						let payload = JSON.parse(JSON.stringify(prev));
						pairs.forEach((item) => {
							let state = payload.find(
								(p: any) => p.symbol === item.data.symbol
							);
							if (!state) {
								state = {
									symbol: item.data.symbol,
									data: [],
								};
								payload.push(state);
							}
							state.data.push([item.data.markPrice, item.timestamp]);
							if (state.data.length > maxLogSize) {
								state.data.splice(0, state.data.length - maxLogSize);
							}
						});
						return payload;
					});
				}
				if (logs.length > maxLogList) {
					const sliceSize = maxLogList - data.length;
					return [...data, ...prev.slice(0, sliceSize)];
				}
				return [...data, ...prev];
			});
		},
	});

	const logsRef = useRef<HTMLDivElement>(null);

	useVirtual({
		parentRef: logsRef,
		size: 30,
	});

	return (
		<>
			<div className='logs' ref={logsRef}>
				<ul>
					{logs.map((item) => (
						<li key={`${item.timestamp}_index`}>
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
			<div className='logs__charts'>
				{pairLogs.map((item: any) => (
					<div className='logs__chart' key={item.symbol}>
						<h3>{item.symbol}</h3>
						<LineChart height={200} width={200} data={item.data} />
					</div>
				))}
			</div>
		</>
	);
}

export default memo(Logs);
