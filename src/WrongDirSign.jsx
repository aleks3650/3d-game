import { Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";
import { usePoints } from "./store";

const WrongDirSign = ({position, rotate}) => {
    const {setNotification} = usePoints();
  return (
    <>
      <RigidBody position={position} type="fixed">
        <CuboidCollider
          sensor
          args={[5, 5, 1]}
          rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
          onIntersectionExit={() => {
            setNotification("Nie w te strone!");
          }}
        />
      </RigidBody>

      <Box
        position={position}
        args={[10, 10, 2]}
        rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
      >
        <meshStandardMaterial visible={false} color='red' wireframe />
      </Box>
    </>
  );
};

export default WrongDirSign;
