import React from "react";
import { usePoints } from "./store";

const Score = ({ gameStarted }) => {
  const data = usePoints();
  return (
    <>
      {gameStarted && (
        <div className="fixed top-2 right-2 text-2xl bg-amber-500 ">
          Score: {data.points.length}
        </div>
      )}
    </>
  );
};

export default Score;
