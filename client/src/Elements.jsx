import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import React from 'react'

export const Elements = () => {
  const { nodes, materials } = useGLTF('/City.glb')
    return (
    <group scale={0.01}>
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01001_Color_0.geometry}
            material={materials.Color}
            position={[-1953.838, 866.542, 3827.609]}
            rotation={[-Math.PI / 2, 0, 1.552]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_03001_Color_0.geometry}
            material={materials.Color}
            position={[-1351.305, 861.398, 4735.48]}
            rotation={[-Math.PI / 2, 0, -3.137]}
            scale={[115.453, 115.453, 130.568]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_02001_Color_0.geometry}
            material={materials.Color}
            position={[-1069.777, 856.263, 3533.188]}
            rotation={[-1.57, 0.003, -1.651]}
            scale={[108.734, 108.734, 122.969]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01002_Color_0.geometry}
            material={materials.Color}
            position={[-1062.165, 866.679, 4445.899]}
            rotation={[-Math.PI / 2, 0, -1.517]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_03002_Color_0.geometry}
            material={materials.Color}
            position={[-4188.248, 871.969, 2070.985]}
            rotation={[-Math.PI / 2, 0, 0.096]}
            scale={[115.453, 115.453, 130.568]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01003_Color_0.geometry}
            material={materials.Color}
            position={[-3765.702, 876.822, 2068.646]}
            rotation={[-Math.PI / 2, 0, 0.054]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01004_Color_0.geometry}
            material={materials.Color}
            position={[-1066.5, 866.542, 3213.812]}
            rotation={[-Math.PI / 2, 0, -1.547]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_03003_Color_0.geometry}
            material={materials.Color}
            position={[-1948.423, 861.398, 4132.357]}
            rotation={[-Math.PI / 2, 0, 1.575]}
            scale={[115.453, 115.453, 130.568]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01005_Color_0.geometry}
            material={materials.Color}
            position={[-2650.419, 875.323, -2015.3]}
            rotation={[-Math.PI / 2, 0, -3.117]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_02002_Color_0.geometry}
            material={materials.Color}
            position={[-2937.48, 863.928, -2017.485]}
            rotation={[-1.567, -0.001, -3.067]}
            scale={[108.734, 108.734, 122.969]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_02003_Color_0.geometry}
            material={materials.Color}
            position={[1865.862, 871.482, -1238.613]}
            rotation={[-1.57, 0.003, -1.586]}
            scale={[134.228, 134.228, 151.801]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01006_Color_0.geometry}
            material={materials.Color}
            position={[-1895.073, 873.214, -198.799]}
            rotation={[-Math.PI / 2, 0, -1.552]}
            scale={114.832}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_02005_Color_0.geometry}
            material={materials.Color}
            position={[-2462.691, 871.733, 5286.931]}
            rotation={[-1.572, -0.003, 1.575]}
            scale={[134.228, 134.228, 151.801]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_02006_Color_0.geometry}
            material={materials.Color}
            position={[938.471, 871.482, 3326.47]}
            rotation={[-1.574, 0.001, 0.033]}
            scale={[134.228, 134.228, 151.801]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01007_Color_0.geometry}
            material={materials.Color}
            position={[-4345.301, 862.88, -2387.475]}
            rotation={[-Math.PI / 2, 0, -1.547]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_02004_Color_0.geometry}
            material={materials.Color}
            position={[-3565.826, 902.02, 398.548]}
            rotation={[-1.567, 0, -2.996]}
            scale={[145.892, 145.892, 164.992]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_01008_Color_0.geometry}
            material={materials.Color}
            position={[-3323.092, 876.822, -179.771]}
            rotation={[-Math.PI / 2, 0, -1.517]}
            scale={103.874}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Taxi001_Color_0.geometry}
            material={materials.Color}
            position={[-176.415, 873.847, 2804.691]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={117.891}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Taxi002_Color_0.geometry}
            material={materials.Color}
            position={[-1100.107, 867.335, -1801.653]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={117.891}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Taxi003_Color_0.geometry}
            material={materials.Color}
            position={[-5433.662, 867.335, 2949.457]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={117.891}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_polizia001_Color_0.geometry}
            material={materials.Color}
            position={[-5165.982, 821.353, 2083.488]}
            rotation={[-1.557, 0, -Math.PI]}
            scale={95.16}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_polizia002_Color_0.geometry}
            material={materials.Color}
            position={[-5142.649, 821.353, 1547.2]}
            rotation={[-1.557, 0, -Math.PI]}
            scale={95.16}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Macchina_polizia003_Color_0.geometry}
            material={materials.Color}
            position={[-4905.178, 821.353, 2497.354]}
            rotation={[-1.566, 0.013, -1.962]}
            scale={95.16}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rimorchio001_Color_0.geometry}
            material={materials.Color}
            position={[-3307.786, 945.143, -2702.521]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[100, 92.379, 100]}
          />
        </RigidBody>
        
        <RigidBody type="dynamic" colliders="hull">
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rimorchio002_Color_0.geometry}
            material={materials.Color}
            position={[-1108.717, 945.143, 407.596]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={[100, 92.379, 100]}
          />
        </RigidBody>
    </group>
)
}

useGLTF.preload('/City.glb')