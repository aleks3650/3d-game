import { Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";

const Gate = (props) => {
  const { position, rotate, handleAddScore, i } = props;
  return (
    <>
      <RigidBody position={position} type="fixed">
        <CuboidCollider
          sensor
          args={[5, 5, 1]}
          rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
          onIntersectionEnter={() =>handleAddScore(i)}
        />
      </RigidBody>

      <Box
        position={position}
        args={[10, 10, 2]}
        rotation={[0, rotate ? -Math.PI / 2 : 0, 0]}
      >
        <meshStandardMaterial color="blue" wireframe />
      </Box>
    </>
  );
};

export default Gate;
