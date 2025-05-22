import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function Buildings({ controlsCamera }) {
  const { scene, nodes } = useGLTF('/City.glb')

  const buildingNames = useMemo(() => [
    'Palazzo_Giallo_Color_0',
    'Palazzo_blu_Color_0',
  ], [])

  const boxes = useRef([])

  const exclude = useMemo(() => [
    'Macchina_01001_Color_0',
    'Macchina_03001_Color_0',
    'Macchina_02001_Color_0',
    'Macchina_01002_Color_0',
    'Macchina_03002_Color_0',
    'Macchina_01003_Color_0',
    'Macchina_01004_Color_0',
    'Macchina_03003_Color_0',
    'Macchina_01005_Color_0',
    'Macchina_02002_Color_0',
    'Macchina_02003_Color_0',
    'Macchina_01006_Color_0',
    'Macchina_02005_Color_0',
    'Macchina_02006_Color_0',
    'Macchina_01007_Color_0',
    'Macchina_02004_Color_0',
    'Macchina_01008_Color_0',
    'Taxi001_Color_0',
    'Taxi002_Color_0',
    'Taxi003_Color_0',
    'Macchina_polizia001_Color_0',
    'Macchina_polizia002_Color_0',
    'Macchina_polizia003_Color_0',
    'Rimorchio001_Color_0',
    'Rimorchio002_Color_0',
  ]
  , [])

  useEffect(() => {
    exclude.forEach(name => {
      const obj = scene.getObjectByName(name, true)
      if (obj) obj.visible = false
    })
  }, [scene, exclude])

  useEffect(() => {
    boxes.current = buildingNames
      .map(name => {
        const mesh = nodes[name]
        if (!mesh || !mesh.isMesh) return null
        mesh.material = mesh.material.clone()
        mesh.material.transparent = true
        const box = new THREE.Box3().setFromObject(mesh)
        return { mesh, box }
      })
      .filter(Boolean)
  }, [buildingNames, nodes])

  useFrame(() => {
    if(!controlsCamera.current) return
    const camPos = controlsCamera.current.camera.position
    boxes.current.forEach(({ mesh, box }) => {
      mesh.material.opacity = box.containsPoint(camPos) ? 0.2 : 1.0
    })
  })

  return (<primitive object={scene} />)
}
