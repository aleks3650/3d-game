import {
  CameraControls,
  Environment,
  KeyboardControls,
  Sky,
  
} from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Surrounding from "./Surrounding";
import { Physics } from "@react-three/rapier";
import { controls } from "./assets/constants";

const App = () => {
  const controlsCamera = useRef(null);
  const cameraPosition = useRef(null);

  useEffect(() => {
    const checkCamera = () => {
      const controls = controlsCamera.current;
      if (controls?.camera) {
        cameraPosition.current = controls.camera.position;
      } else {
        requestAnimationFrame(checkCamera);
      }
    };

    checkCamera();
  }, []);

  return (
    <KeyboardControls map={controls}>
      <Canvas
        style={{ height: "100dvh" }}
        camera={{
          position: [8, 6.5, 8],
          fov: 75,
        }}
      >
        <CameraControls
          // maxPolarAngle={Math.PI / 6}
          // minPolarAngle={Math.PI / 2}
          minDistance={13}
          maxDistance={13}
          ref={controlsCamera}
          makeDefault

        />
        <Physics gravity={[0, -10, 0]} debug>
          <Cube controlsCamera={controlsCamera} />
          <Surrounding />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
};

export default App;
