import { useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CarArmata } from "./CarArmataModel";
import { useCarStore, usePoints } from "./store";
import { socket } from "./SocketManager";

const Cube = ({ controlsCamera, isLocal, carState }) => {
  const [_, get] = useKeyboardControls();
  const rigidBodyRef = useRef();
  const isMovingRef = useRef(false);
  const lastUpdateTime = useRef(0);
  const { clearPoints, setNotification, setFinalNotification, clearTime } = usePoints();
  const { setLocalCarRef } = useCarStore();
  const { localCarRef } = useCarStore();

  useEffect(() => {
    if (isLocal && rigidBodyRef.current) {
      setLocalCarRef(rigidBodyRef.current);

      const timer = setTimeout(() => {
        if (controlsCamera.current && rigidBodyRef.current) {
          const pos = rigidBodyRef.current.translation();
          controlsCamera.current.setLookAt(
            pos.x, pos.y + 8, pos.z + 12,
            pos.x, pos.y, pos.z,
            false
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLocal, setLocalCarRef, controlsCamera]);

  const updatePosition = (position, rotation) => {
    if (!isLocal) return;
    const now = Date.now();
    if (now - lastUpdateTime.current > 50) {
      lastUpdateTime.current = now;
      socket.emit('carUpdate', {
        position: [position.x, position.y, position.z],
        rotation: [rotation.x, rotation.y, rotation.z, rotation.w]
      });
    }
  };

  const resetCar = () => {
    if (localCarRef) {
      localCarRef.setTranslation({ x: 26, y: 20, z: -15 }, true);
      localCarRef.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      localCarRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
      localCarRef.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  useEffect(() => {
    if (!isLocal && rigidBodyRef.current && carState) {
      const { position, rotation } = carState;
      if (position && rotation) {
        rigidBodyRef.current.setTranslation({
          x: position[0],
          y: position[1],
          z: position[2]
        }, true);
        rigidBodyRef.current.setRotation({
          x: rotation[0],
          y: rotation[1],
          z: rotation[2],
          w: rotation[3]
        }, true);
      }
    }
  }, [isLocal, carState]);

  useFrame((_, delta) => {
    if (!isLocal || !controlsCamera.current || !rigidBodyRef.current) return;

    const { forward, backward, left, right, jump, reset } = get();
    const { x, y, z } = rigidBodyRef.current.translation();
    const quaternion = rigidBodyRef.current.rotation();

    if (reset) {
      console.log("sss")
      clearPoints();
      setNotification('');
      setFinalNotification('');
      clearTime();
      resetCar();
    }

    if (y < -30) {
      rigidBodyRef.current.setTranslation({ x: 26, y: 20, z: -15 }, true);
      rigidBodyRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      clearPoints();
    }

    if (jump) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 });
    }

    const rotationSpeed = 2;
    const angvelY = left ? rotationSpeed : right ? -rotationSpeed : 0;
    rigidBodyRef.current.setAngvel({ x: 0, y: angvelY, z: 0 }, true);

    if (angvelY !== 0) {
      controlsCamera.current.rotate(angvelY * delta, 0);
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
        cameraTargetPos.x, cameraTargetPos.y, cameraTargetPos.z,
        x, y, z, true
      );

      const impulse = forwardVector.clone().multiplyScalar(-impulseStrength);
      rigidBodyRef.current.applyImpulse({ x: impulse.x, y: 0, z: impulse.z }, true);
    } else {
      controlsCamera.current.moveTo(x, y, z, true);
    }

    if (backward) {
      const impulse = forwardVector.clone().multiplyScalar(impulseStrength);
      rigidBodyRef.current.applyImpulse({ x: impulse.x, y: 0, z: impulse.z }, true);
    }

    updatePosition(rigidBodyRef.current.translation(), rigidBodyRef.current.rotation());
  });

  const initialPosition = isLocal ? [26, 20, -15] : (carState?.position || [26, 20, -15]);
  const initialRotation = isLocal ? [0, 0, 0] : (carState?.rotation || [0, 0, 0, 1]);

  return (
    <RigidBody
      type={isLocal ? "dynamic" : "kinematicPosition"}
      colliders="hull"
      ref={rigidBodyRef}
      position={initialPosition}
      rotation={initialRotation}
      friction={0}
    >
      <CarArmata scale={3} isMovingRef={isMovingRef} />
    </RigidBody>
  );
};

export default Cube;
