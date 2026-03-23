import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { usePersistedCounter } from './use-persisted-counter';

describe('usePersistedCounter', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('retourne la valeur initiale si rien en storage', () => {
    const { result } = renderHook(() => usePersistedCounter('test', 7));
    expect(result.current[0]).toBe(7);
  });

  it('retourne la valeur sauvegardée si elle existe', () => {
    localStorage.setItem('test', '42');
    const { result } = renderHook(() => usePersistedCounter('test', 0));
    expect(result.current[0]).toBe(42);
  });

  it('persiste la valeur dans localStorage après mise à jour', () => {
    const { result } = renderHook(() => usePersistedCounter('test', 0));
    act(() => result.current[1]((c) => c + 5));
    expect(result.current[0]).toBe(5);
    expect(localStorage.getItem('test')).toBe('5');
  });

  it('recharge la valeur persistée après remontage du hook', () => {
    const { result: r1 } = renderHook(() => usePersistedCounter('test', 0));
    act(() => r1.current[1]((c) => c + 3));

    const { result: r2 } = renderHook(() => usePersistedCounter('test', 0));
    expect(r2.current[0]).toBe(3);
  });

  it('ignore une valeur corrompue en storage et utilise le fallback', () => {
    localStorage.setItem('test', 'pas-un-nombre');
    const { result } = renderHook(() => usePersistedCounter('test', 99));
    expect(result.current[0]).toBe(99);
  });
});
