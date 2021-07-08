import { useEffect, useState } from 'react';

async function promiseTimeout(time: number) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

export const useScore = (
  initialScore: number,
  maxScore: number,
  forceWin: boolean,
) => {
  const [score, setScore] = useState<number>(initialScore);
  const [wins, setWins] = useState(false);
  const [confirmedWins, setConfirmedWins] = useState(false);

  const increment = () =>
    setScore((currentScore) => Math.min(maxScore, currentScore + 1));

  const asyncIncrement = async () => {
    await promiseTimeout(100);
    increment();
  };

  async function confirmWin() {
    await promiseTimeout(100); //simulated post
    setConfirmedWins(true);
  }

  useEffect(
    function toggleWin() {
      if (score === maxScore) {
        setWins(true);
      }
    },
    [score, maxScore],
  );

  useEffect(() => {
    if (score === maxScore) {
      confirmWin();
    }
  }, [maxScore, score]);

  useEffect(() => {
    if (forceWin) {
      setWins(true);
    }
  }, [forceWin]);

  return { score, increment, wins, confirmedWins, asyncIncrement };
};
