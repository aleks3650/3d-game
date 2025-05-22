import { useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CarArmata } from "./CarArmataModel";
import { useCarReference, usePoints } from "./store";

const Cube = (props) => {
  const [_, get] = useKeyboardControls();
  const rigidBodyRef = useCarReference((s) => s.carRef)

  const isMovingRef = useRef(false);
  const { controlsCamera } = props;
  const rotationSpeed = 2;
    const {clearPoints} = usePoints();

  useFrame((_, delta) => {
    if(!controlsCamera.current) return
    const { forward, backward, left, right, jump } = get();
    const { x, y, z } = rigidBodyRef.current.translation();
    const quaternion = rigidBodyRef.current.rotation();
    if (left && right) return;

    if (y < -30) {
      rigidBodyRef.current.setTranslation({ x: 26, y: 20, z: -15 }, true);
      rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      clearPoints()
    }

    if (jump) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 2, z: 0 });
    }

    const angvelY = left ? rotationSpeed : right ? -rotationSpeed : 0;
    rigidBodyRef.current.setAngvel({ x: 0, y: angvelY, z: 0 }, true);

    if (angvelY !== 0) {
      controlsCamera.current.rotate(angvelY * delta, 0);
    }

    const velocity = rigidBodyRef.current.linvel();
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    isMovingRef.current = speed > 1;

    if (!forward ) {
      controlsCamera.current.moveTo(x, y, z, true);
    }
    const forwardVector = new Vector3(1, 0, 0).applyQuaternion(quaternion);
    const impulseStrength = delta * 45;

    if (forward) {
      const offsetBehind = -18;
      const offsetAbove = 9;
    
      const behindVector = forwardVector.clone().multiplyScalar(-offsetBehind);
      const cameraTargetPos = new Vector3(x, y, z).add(behindVector).add(new Vector3(0, offsetAbove, 0));
    
      controlsCamera.current.moveTo(cameraTargetPos.x, cameraTargetPos.y, cameraTargetPos.z, true);
      controlsCamera.current.setLookAt(
        cameraTargetPos.x,
        cameraTargetPos.y,
        cameraTargetPos.z,
        x, 
        y,
        z,
        true 
      )    
      const impulse = forwardVector.clone().multiplyScalar(-impulseStrength);
      rigidBodyRef.current.applyImpulse({ x: impulse.x, y: 0, z: impulse.z }, true);
    }
    
    if (backward) {
      const impulse = forwardVector.clone().multiplyScalar(impulseStrength);
      rigidBodyRef.current.applyImpulse(
        { x: impulse.x, y: 0, z: impulse.z },
        true
      );
    }
  });

  return (
    <RigidBody
      type="dynamic"
      colliders="hull"
      ref={rigidBodyRef}
      position={[26, 20, -15]}
      friction={0}
      rotation={[0, 0, 0]}
    >
      <CarArmata scale={3} isMovingRef={isMovingRef} />
    </RigidBody>
  );
};

export default Cube;
