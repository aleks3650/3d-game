import { Environment, Sky } from "@react-three/drei";
import { CuboidCollider } from "@react-three/rapier";
import React from "react";
import { City } from "./CityModel";

const Surrounding = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sky distance={4500} sunPosition={[0, 5, 1]} />
      <City/>
      {/* <City position={[90, 0,0]} /> */}
    </>
  );
};

export default Surrounding;
