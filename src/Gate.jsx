import { Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";
import {  usePoints } from "./store";
import { FlagModel } from "./FlagModel";
import { ArrowModel } from "./ArrowModel";

const Gate = (props) => {
  const { position, rotate,ArrowDirecion, i, tableLength } = props;
  const data = usePoints();
  
  useEffect(() => {
    const timerID = setTimeout(() => {
      data.setNotification("");
    }, 5000);
    return () => {
      clearTimeout(timerID);
    };
  }, [data]);
  return (
    <>
      <RigidBody position={position} type="fixed">
        <CuboidCollider
          sensor
          args={[5, 5, 1]}
          rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
          onIntersectionExit={() => {
            const rest = [...data.points].slice(0, -1);
            if (rest.includes(i)) {
              data.setNotification("Nie w te strone!");
              return;
            }
            data.setNotification("")
            data.addPoint(i);
            if(data.points.length === tableLength){
              const elapsedMs = new Date().getTime() - data.timeStart.getTime();
              const elapsedSeconds = Math.floor(elapsedMs / 1000);
              let displayTime = Math.max(0, elapsedSeconds).toString();
              data.setFinalNotification(`Uzyskany Czas: ${displayTime}s`);
              data.clearPoints()
            }
            if (i === 0) {
              const date = Date.now();
              data.setStartTime(new Date(date));
              data.setFinalNotification('')
              data.startPoints()
            }
          }}
        />
      </RigidBody>

      <Box
        position={position}
        args={[10, 10, 2]}
        rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
      >
        <meshStandardMaterial visible={false} />
        <FlagModel position={[5, -3, 0]} />
        <FlagModel position={[-5, -3, 0]} />
        <ArrowModel position={[0,2,0]} rotation-y={ArrowDirecion} />
      </Box>
    </>
  );
};

export default Gate;
