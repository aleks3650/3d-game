import { Environment, Sky } from "@react-three/drei";
import { CuboidCollider } from "@react-three/rapier";
import React from "react";
import { City } from "./CityModel";

const Surrounding = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sky distance={4500} sunPosition={[0, 5, 1]} />

      <CuboidCollider position={[-11.5, 8, 14.5]} args={[45, 0, 43.5]} />

      <City/>
    </>
  );
};

export default Surrounding;
