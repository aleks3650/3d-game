import React, { useState, useEffect } from "react";
import { usePoints } from "./store";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Score = ({ gameStarted }) => {
  const data = usePoints();
  const { points, timeStart, notification } = data;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let interval;
    if (gameStarted && timeStart) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, timeStart]);

  let displayTime = "Nie rozpoczęto";
  if (timeStart) {
    const elapsedMs = currentTime.getTime() - timeStart.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    displayTime = Math.max(0, elapsedSeconds).toString();
  }

  return (
    <>
      <AnimatePresence>
        {gameStarted && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            layout
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-2 right-2 text-2xl bg-gradient-to-b from-gray-900/60 to-gray-800/60 p-4 rounded-2xl text-white text-center flex flex-col items-center space-y-2 backdrop-blur-sm shadow-2xl border border-white/10"
          >
            <div className="flex gap-2">
              <span>Punkty:</span>
              <motion.span
                key={points.length}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {points.length}
              </motion.span>
            </div>

            <div className="flex gap-2">
              <span>Czas:</span>
              <motion.span
                key={displayTime}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {displayTime}
              </motion.span>
            </div>

            <AnimatePresence>
              {notification && (
                <motion.div
                  key="notification"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "#ff4444" }}
                  className="absolute top-full mt-2 overflow-hidden bg-gradient-to-b from-gray-900/60 to-gray-800/60 p-4 rounded-2xl backdrop-blur-lg shadow-2xl border border-white/10"
                >
                  {notification}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Score;