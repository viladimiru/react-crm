import { useEffect, useState } from 'react';

export function useDebounce(value: any, timeout: number) {
	const [val, setValue] = useState(value);
	useEffect(() => {
		const timer = setTimeout(() => {
			setValue(value);
		}, timeout);
		return () => clearTimeout(timer);
	}, [value, timeout]);
	return val;
}
