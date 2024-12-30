/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isNewYear, setIsNewYear] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (Object.keys(updatedTimeLeft).length === 0) {
        setIsNewYear(true);
        clearInterval(timer);
      }
    }, 1000);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const difference = +new Date(`${nextYear}-01-01T00:00:00`) - +now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = ["days", "hours", "minutes", "seconds"].map(
    (interval, index, array) => {
      const value = timeLeft[interval] !== undefined ? timeLeft[interval] : 0;

      return (
        <React.Fragment key={interval}>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 w-24 flex justify-center">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 w-full text-center">
              {interval}
            </span>
          </div>
          {index < array.length - 1 && (
            <div className="hidden sm:block text-4xl sm:text-6xl font-thin text-gray-600 mx-2 sm:mx-4">
              :
            </div>
          )}
        </React.Fragment>
      );
    }
  );

  const nextYear = new Date().getFullYear() + 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zig text-white px-4">
      {isNewYear && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          New Year Countdown
        </span>
      </h1>
      <div className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
        to {nextYear}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-2 bg-gray-800 bg-opacity-50 rounded-3xl shadow-2xl backdrop-blur-lg p-8 sm:p-12 w-full max-w-4xl mx-auto">
        {Object.keys(timeLeft).length ? (
          timerComponents
        ) : (
          <span className="text-3xl sm:text-5xl font-bold text-center animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            🎊⭐ Happy New Year {nextYear} 🍾🎊!
          </span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
