import { useCallback, useState } from 'react';

function readFromStorage(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeToStorage(key: string, value: number): void {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // localStorage indisponible (navigation privée saturée, etc.)
  }
}

export function usePersistedCounter(key: string, initialValue: number) {
  const [count, setCount] = useState<number>(() =>
    readFromStorage(key, initialValue),
  );

  const setValue = useCallback(
    (updater: (prev: number) => number) => {
      setCount((prev) => {
        const next = updater(prev);
        writeToStorage(key, next);
        return next;
      });
    },
    [key],
  );

  return [count, setValue] as const;
}
