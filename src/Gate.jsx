import { Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";
import { usePoints } from "./store";
import { FlagModel } from "./FlagModel";

const Gate = (props) => {
  const { position, rotate, i } = props;
  const data = usePoints();
  useEffect(() => {
    const timerID = setTimeout(() => {
        data.setNotification('')
    }, 5000);
    return () => {
        clearTimeout(timerID)
    }
  }, [data])

  return (
    <>
      <RigidBody position={position} type="fixed">
        <CuboidCollider
          sensor
          args={[5, 5, 1]}
          rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
          onIntersectionExit={() => {
            const rest = [...data.points].slice(0, -1);
            console.log("asdasd", rest);
            if (rest.includes(i)) {
              data.setNotification("Nie w te strone!");
              return;
            }
            data.addPoint(i);
            if (i === 0) {
              const date = Date.now();
              data.setStartTime(new Date(date));
            }
          }}
        />
      </RigidBody>

      <Box
        position={position}
        args={[10, 10, 2]}
        rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
      >
        <meshStandardMaterial color="blue" wireframe />
        <FlagModel position={[5, -3, 0]} />
        <FlagModel position={[-5, -3, 0]} />
      </Box>
    </>
  );
};

export default Gate;
