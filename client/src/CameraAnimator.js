import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

const CameraAnimator = () => {
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta * 0.5;
    camera.position.x = 20 + Math.sin(time.current) * 30;
    camera.position.z = -20 + Math.cos(time.current) * 30;
    camera.position.y = 20;
    camera.lookAt(-20, 0, 20);
  });

  return null;
};
export default CameraAnimator;
