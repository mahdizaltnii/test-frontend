import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const router = useRouter();
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if value changes, delay changes, or component unmounts

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  // Return debounced value and setter

  return [debouncedValue, setDebouncedValue];
}
