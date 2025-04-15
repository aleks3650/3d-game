import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cube = (props) => {
  const [_, get] = useKeyboardControls();
  const rigidBody = useRef(null);
  const { controlsCamera } = props;

  useFrame(() => {
      const { forward, backward, left, right } = get();
      if (left && rigidBody.current) {
        console.log(controlsCamera.current)
      controlsCamera.current.rotate(-0.02, 0);
    }
    if (right && rigidBody.current) {
        controlsCamera.current.rotate(0.02, 0);
      }
    if (forward && rigidBody.current) {
        controlsCamera.current.dollyTo(13330.1, true);
      rigidBody.current.applyImpulse(
        {
          x: -controlsCamera.current.camera.position.x / 100,
          y: 0,
          z: -controlsCamera.current.camera.position.z / 100,
        },
        true
      );
    }
    if (backward && rigidBody.current) {
      rigidBody.current.applyImpulse(
        {
          x: controlsCamera.current.camera.position.x / 100,
          y: 0,
          z: controlsCamera.current.camera.position.z / 100,
        },
        true
      );
    }
  });

  return (
    <RigidBody
      type="dynamic"
      colliders="hull"
      ref={rigidBody}
      position={[0, 2, 0]}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6be092" />
      </mesh>
    </RigidBody>
  );
};

export default Cube;
