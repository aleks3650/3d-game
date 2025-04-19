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
import Gate from "./Gate";

const App = () => {
  const controlsCamera = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [passedGates, setPassedGates] = useState([]);

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

  const handleAddScore = (i) => {
    if (passedGates.includes(i)) return;
    setPassedGates((prev) => [...prev, i]);
  };

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
          <Suspense fallback={null}>
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
                  <Cube controlsCamera={controlsCamera} />
                  <Surrounding />
                  <Gate
                    position={[0, 10, 0]}
                    rotate={true}
                    handleAddScore={handleAddScore}
                    i={0}
                  />
                  <Gate
                    position={[0, 10, -10]}
                    rotate={false}
                    handleAddScore={handleAddScore}
                    i={1}
                  />
              </>
            )}
            </Suspense>
          </Physics>
        </Canvas>
        {gameStarted && (
          <div className="fixed top-2 right-2 text-2xl bg-amber-500 ">
            Score: {passedGates.length}
          </div>
        )}
      </KeyboardControls>
      <Loader />
    </>
  );
};

export default App;
