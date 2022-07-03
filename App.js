import React, { Suspense, useEffect, useRef } from 'react'
import { useFrame, Canvas } from '@react-three/fiber/native'
import { useGLTF, Environment, useAnimations } from '@react-three/drei/native'
import iphoneModelPath from './assets/iphone.glb'
import porscheModelPath from './assets/porsche.glb'
import ryanPath from './assets/Ryan.glb'
import userAvPath from './assets/userAvatarAnimation.glb'
import bananaPath from './assets/banana.glb'

function Model({ url, ...rest }) {
  const group = useRef()
  const { scene, nodes, materials, animations } = useGLTF(url)
  useFrame(() => (scene.rotation.y += 0.01))
  const { actions } = useAnimations(animations, group)
  return <primitive {...rest} object={scene} />
}

export default function App() {
  return (
    <Canvas legacy={true} gl={{ physicallyCorrectLights: true }} camera={{ position: [-10, 15, 20], fov: 35, zoom:0.5}}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense fallback={null}>
        <Environment preset="park" />
        <Model url={iphoneModelPath} />
      </Suspense>
    </Canvas>
  )
}
