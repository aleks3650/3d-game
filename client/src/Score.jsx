import React, { useState, useEffect } from "react";
import { useCarStore, usePoints } from "./store";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useKeyboardControls } from "@react-three/drei";

const Score = ({ gameStarted }) => {
  const data = usePoints();
  const { localCarRef } = useCarStore();
  const [sub, _get] = useKeyboardControls();

  const resetCar = () => {
    if (localCarRef) {
      localCarRef.setTranslation({ x: 26, y: 20, z: -15 }, true);
      localCarRef.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      localCarRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
      localCarRef.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  useEffect(() => {
    return sub(
      (state) => state.reset,
      (pressed) => {
        if (!pressed) return;
        clearPoints();
        setNotification('');
        setFinalNotification('');
        clearTime();
        resetCar();
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub]);

  const { 
    points, 
    timeStart, 
    notification, 
    finalNotification, 
    clearPoints, 
    setNotification, 
    setFinalNotification, 
    clearTime 
  } = data;
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let interval;
    if (gameStarted && timeStart) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      if (finalNotification) clearTimeout(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, timeStart, finalNotification]);

  let displayTime = "Nie rozpoczęto";
  if (timeStart) {
    const elapsedMs = currentTime.getTime() - timeStart.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    displayTime = Math.max(0, elapsedSeconds).toString();
  }

  const handleReset = () => {
    clearPoints();
    setNotification('');
    setFinalNotification('');
    clearTime();
    resetCar();
  };

  return (
    <>
      <AnimatePresence>
        {finalNotification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            layout
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-1/2 right-1/2 translate-x-1/2 bg-gradient-to-b from-gray-900/60 to-gray-800/60
             p-4 rounded-2xl text-white text-center flex flex-col items-center space-y-2 backdrop-blur-sm shadow-2xl 
             border border-white/10 text-4xl -translate-y-10/12"
          >
            <span>Ukończono tego typu: </span>
            <span>{finalNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameStarted && (
          <motion.div
            onClick={handleReset}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-2 left-2 bg-gradient-to-b from-gray-900/60 to-gray-800/60
             p-4 rounded-2xl text-white text-center flex flex-col items-center space-y-2 backdrop-blur-sm shadow-2xl
             border border-white/10 text-2xl cursor-pointer hover:from-gray-800/60 hover:to-gray-700/60 transition-all"
          >
            <span>Reset</span>
          </motion.div>
        )}
      </AnimatePresence>
      
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
