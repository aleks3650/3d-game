import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useMemo } from 'react';
import { useFrame } from 'react-three-fiber';

export function FlagModel(props) {
  const gltf = useGLTF('/Flag.glb');
  const model = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  const { actions } = useAnimations(gltf.animations, model);

  useFrame(() => {
    if (actions['bruh']) {
      actions['bruh'].play();
    }
  });

  return <primitive object={model} {...props} />;
}