import { CameraControls, KeyboardControls, Loader } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Surrounding from "./Surrounding";
import { Physics } from "@react-three/rapier";
import { controls } from "./assets/constants";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import MenuOverlay from "./MenuOverlay";
import CameraAnimator from "./CameraAnimator";

const App = () => {
  const controlsCamera = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    const animateCamera = () => {
      if (controlsCamera.current) {
        controlsCamera.current.setLookAt(12, 8, 12, 0, 0.5, 0, true);
      } else {
        requestAnimationFrame(animateCamera);
      }
    };
    animateCamera();
  }, [gameStarted]);

  return (
    <>
      <KeyboardControls map={controls}>
        {!gameStarted && <MenuOverlay onStart={() => setGameStarted(true)} />}
        <Canvas
          style={{ height: "100dvh" }}
          camera={{
            fov: 50,
          }}
          shadows
        >
          <EffectComposer>
            <DepthOfField
              focusDistance={0.01}
              focalLength={gameStarted ? 0.07 : 0.02}
              bokehScale={gameStarted ? 3 : 7}
            />
          </EffectComposer>

          <Physics gravity={[0, -10, 0]}>
            {!gameStarted ? (
              <>
                <CameraAnimator />
                <Surrounding scale={0.8} position={[0, -2, 0]} />
              </>
            ) : (
              <>
                <CameraControls
                  maxPolarAngle={Math.PI / 2}
                  minDistance={13}
                  maxDistance={33}
                  ref={controlsCamera}
                  makeDefault
                />
                <Suspense fallback={null}>
                  <Cube controlsCamera={controlsCamera} />
                  <Surrounding />
                </Suspense>
              </>
            )}
          </Physics>
        </Canvas>
      </KeyboardControls>
      <Loader />
    </>
  );
};

export default App;
