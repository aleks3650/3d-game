import { useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CarArmata } from "./CarArmataModel";

const Cube = (props) => {
  const [_, get] = useKeyboardControls();
  const rigidBody = useRef(null);
  const isMovingRef = useRef(false); 
  const { controlsCamera } = props;
  const rotationSpeed = 2;

  useFrame((_, delta) => {
    const { forward, backward, left, right, jump } = get();
    const { x, y, z } = rigidBody.current.translation();
    const quaternion = rigidBody.current.rotation();

    if (jump) {
      rigidBody.current.applyImpulse({ x: 0, y: 1, z: 0 });
    }

    const forwardVector = new Vector3(1, 0, 0).applyQuaternion(quaternion);
    const impulseStrength = delta * 45; 

    if (forward) {
      const impulse = forwardVector.clone().multiplyScalar(-impulseStrength);
      rigidBody.current.applyImpulse({ x: impulse.x, y: 0, z: impulse.z }, true);
    }
    if (backward) {
      const impulse = forwardVector.clone().multiplyScalar(impulseStrength);
      rigidBody.current.applyImpulse({ x: impulse.x, y: 0, z: impulse.z }, true);
    }

    const angvelY = left ? rotationSpeed : right ? -rotationSpeed : 0;
    rigidBody.current.setAngvel({ x: 0, y: angvelY, z: 0 }, true);

    if (angvelY !== 0) {
      controlsCamera.current.rotate(angvelY * delta, 0);
    }

    const velocity = rigidBody.current.linvel();
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    isMovingRef.current = speed > 0.1;

    controlsCamera.current.moveTo(x, y, z, true);
  });

  return (
    <RigidBody
      type="dynamic"
      colliders="hull"
      ref={rigidBody}
      position={[0, 20, 0]}
      friction={0}
      rotation={[0, -Math.PI/4, 0]}
    >
      <CarArmata scale={3} isMovingRef={isMovingRef} />
    </RigidBody>
  );
};

export default Cube;