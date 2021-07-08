import { useScore } from './useScore.hook';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useScore', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useScore(0, 1, false));
    expect(result.current).toBeDefined();
  });
  it('[BETTER] should be defined', () => {
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    expect(result.current).toBeDefined();
  });

  it('should increment score', () => {
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    result.current.increment();
    expect(result.current.score).toBe(1);
  });

  it('[DONT] should have win', () => {
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    result.current.increment();
    expect(result.current.wins).toBe(true);
  });

  it('[DO] should have win', () => {
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    act(() => result.current.increment());
    expect(result.current.wins).toBe(true);
  });

  it('[DO] should trigger win with score >3', () => {
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 3, false],
      },
    );
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.score).toBe(3);
    expect(result.current.wins).toBe(true);
  });

  it('[DONT] should confirm win', async () => {
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    act(() => {
      result.current.increment();
    });
    expect(result.current.wins).toBe(true);
    expect(result.current.confirmedWins).toBe(true);
  });

  it('[DO] should confirm win', async () => {
    const { result, waitForNextUpdate } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    act(() => {
      result.current.increment();
    });
    await waitForNextUpdate();
    expect(result.current.wins).toBe(true);
    expect(result.current.confirmedWins).toBe(true);
  });

  it('[BETTER] should confirm win', async () => {
    const { result, waitFor } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, false],
      },
    );
    act(() => {
      result.current.increment();
    });
    await waitFor(() => result.current.wins);
    await waitFor(() => result.current.confirmedWins);
    expect(result.current.wins).toBe(true);
    expect(result.current.confirmedWins).toBe(true);
  });

  it('[DONT] should react to prop update', async () => {
    let forceWins = false;
    const { result } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, forceWins],
      },
    );
    forceWins = true;
    expect(result.current.wins).toBe(true);
  });

  it('[DO] should react to prop update', async () => {
    let forceWins = false;
    const { result, rerender } = renderHook(
      (props: [number, number, boolean]) => useScore(...props),
      {
        initialProps: [0, 1, forceWins],
      },
    );
    forceWins = true;
    rerender([0, 1, forceWins]);
    expect(result.current.wins).toBe(true);
  });
});
