import { Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";
import { usePoints } from "./store";
import {FlagModel} from './FlagModel'

const Gate = (props) => {
  const { position, rotate, i } = props;
  const data = usePoints();
  const handleAddScore = (i) => {
    data.addPoint(i)
  };

  return (
    <>
      <RigidBody position={position} type="fixed">
        <CuboidCollider
          sensor
          args={[5, 5, 1]}
          rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
          onIntersectionEnter={() => handleAddScore(i)}
        />
      </RigidBody>

      <Box
        position={position}
        args={[10, 10, 2]}
        rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
      >
        <meshStandardMaterial color="blue" wireframe />
      <FlagModel position={[5,-3,0]} />
      <FlagModel position={[-5,-3,0]} />
      </Box>
    </>
  );
};

export default Gate;
