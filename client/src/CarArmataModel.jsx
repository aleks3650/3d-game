import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function CarArmata(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/CarArmata.glb');
  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    if (actions['drive']) {
      if (props.isMovingRef.current) {
        actions['drive'].play();
      } else {
        actions['drive'].stop();
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="06c36a2384dd417fb78c6a83eab59b61fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Car_GRP" position={[0.185, 0, 0]} rotation={[0, 0, -0.14]}>
                  <group name="geo_car" position={[-0.185, 0, 0]}>
                    <mesh
                      name="geo_car_car_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.geo_car_car_0.geometry}
                      material={materials.material}
                    />
                    <group name="geo_turret" position={[0.219, 0.455, 0]}>
                      <mesh
                        name="geo_turret_car_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.geo_turret_car_0.geometry}
                        material={materials.material}
                      />
                      <group
                        name="geo_riffle"
                        position={[-0.237, 0.047, -0.002]}
                        scale={[1.067, 0.948, 0.948]}
                      >
                        <mesh
                          name="geo_riffle_car_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.geo_riffle_car_0.geometry}
                          material={materials.material}
                        />
                      </group>
                      <group
                        name="geo_hatch"
                        position={[-0.035, 0.124, 0.004]}
                        rotation={[0, 0, -0.953]}
                      >
                        <mesh
                          name="geo_hatch_car_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.geo_hatch_car_0.geometry}
                          material={materials.material}
                        />
                      </group>
                    </group>
                    <group name="geo_wheels" position={[-0.212, 0.022, 0]}>
                      <mesh
                        name="geo_wheels_car_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.geo_wheels_car_0.geometry}
                        material={materials.material}
                      />
                    </group>
                    <group name="geo_wheelsTops" position={[-0.217, 0.15, 0]}>
                      <mesh
                        name="geo_wheelsTops_car_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.geo_wheelsTops_car_0.geometry}
                        material={materials.material}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/CarArmata.glb');