"use client";

import * as React from "react";

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((prop: T) => T)) => void] => {
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item) as T);
    }
  }, []);

  const setValue = (value: T | ((prop: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
