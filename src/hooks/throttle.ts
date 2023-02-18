import { useEffect, useState } from 'react';

export function useThrottle(value: any, timeout: number) {
  const [val, setValue] = useState(value);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!pending) {
      setPending(true);
      setTimeout(() => {
        setValue(value);
        setPending(false);
      }, timeout);
    }
  }, [value, timeout]);
  return val;
}
