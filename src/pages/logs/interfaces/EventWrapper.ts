export interface EventWrapper<T> {
	action: 'observe' | 'subscription' | 'alert' | 'spikeAlert' | 'error',
	data: T,
	timestamp: number | string,
	key?: string,
	uid: string
}