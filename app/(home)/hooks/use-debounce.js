import { useEffect, useState } from "react";

export const useDebounce = (value, time = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debouncedValue;
};
