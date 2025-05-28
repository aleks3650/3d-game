import { CameraControls, Html, KeyboardControls, Loader, Stats } from "@react-three/drei";
import React, { startTransition, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Surrounding from "./Surrounding";
import { Physics } from "@react-three/rapier";
import { controls } from "./assets/constants";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import MenuOverlay from "./MenuOverlay";
import CameraAnimator from "./CameraAnimator";
import Score from "./Score";
import GatesMap from "./GatesMap";
import WrongDirMap from "./WrongDirMap";
import { Buildings } from "./BuildingsModel";
import SocketManager from "./SocketManager";
import { useCarStore } from "./store";

const App = () => {
  const controlsCamera = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { cars, localId, localCarRef } = useCarStore();

  useEffect(() => {
    if (!gameStarted || !localCarRef || !controlsCamera.current) return;
      const position = localCarRef.translation();
      controlsCamera.current.setLookAt(
        position.x, position.y + 8, position.z + 12,
        position.x, position.y, position.z,
        true
      );
  }, [gameStarted, localCarRef]);

  const handleStart = () => {
    startTransition(() => {
      setGameStarted(true);
    });
  };

  console.log('Cars:', cars, 'LocalId:', localId);

  return (
    <>
      <SocketManager />
      <KeyboardControls map={controls}>
        {!gameStarted && <MenuOverlay onStart={handleStart} />}
        <Canvas
          style={{ height: "100dvh" }}
          camera={{ fov: 50 }}
          shadows
        >
          <Stats />
          <EffectComposer>
            <DepthOfField
              focusDistance={0.01}
              focalLength={gameStarted ? 0.07 : 0.02}
              bokehScale={gameStarted ? 3 : 7}
            />
          </EffectComposer>

          <Physics gravity={[0, -10, 0]}>
            <Suspense fallback={null}>
              <Surrounding />
              <GatesMap />
              <WrongDirMap />

              {/* Uproszczone renderowanie samochodów */}
              {Object.entries(cars).map(([id, carState]) => (
                <Cube
                  key={id}
                  controlsCamera={controlsCamera}
                  isLocal={id === localId}
                  carState={carState}
                />
              ))}

              <Buildings controlsCamera={controlsCamera} />
              {!gameStarted ? (
                <CameraAnimator />
              ) : (
                <CameraControls
                  maxPolarAngle={Math.PI / 2.1}
                  minDistance={13}
                  maxDistance={33}
                  ref={controlsCamera}
                  makeDefault
                />
              )}
            </Suspense>
          </Physics>
        </Canvas>
        <Score gameStarted={gameStarted} />
      </KeyboardControls>
      <Loader />
    </>
  );
};

export default App;