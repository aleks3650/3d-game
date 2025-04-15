import { Environment, Sky } from "@react-three/drei";
import { CuboidCollider } from "@react-three/rapier";
import React from "react";

const Surrounding = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sky distance={4500} sunPosition={[0, 5, 1]} />

      <CuboidCollider position={[0, -0, 0]} args={[20, 0, 20]} />

      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[40, 1, 40]} />
        <meshStandardMaterial
          color="limegreen"
          transparent
          opacity={0.3}
          wireframe={false}
        />
      </mesh>
    </>
  );
};

export default Surrounding;
