// "use client";

// import { MathUtils } from 'three'
// import { useRef } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'
// import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
// import { easing } from 'maath'
// import { useSnapshot } from 'valtio'
// import { state } from './store';
// // import { Logo } from '@pmndrs/branding'
// import { motion, AnimatePresence } from 'framer-motion'
// import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
  
// const particles = Array.from({ length: 150 }, () => ({
//   factor: MathUtils.randInt(20, 100),
//   speed: MathUtils.randFloat(0.01, 0.75),
//   xFactor: MathUtils.randFloatSpread(40),
//   yFactor: MathUtils.randFloatSpread(10),
//   zFactor: MathUtils.randFloatSpread(10)
// }))

export default function Section10() {

  return (
    <>
      {/* <Canvas />
      <Overlay /> */}
    </>
  );
}

// const Canvas = ({ position = [0, 0, 2.5], fov = 25 }) => (
//   <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
//     <ambientLight intensity={0.5} />
//     <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
//     <CameraRig>
//       <Backdrop />
//       <Center>
//         <Shirt />
//       </Center>
//     </CameraRig>
//   </Canvas>
// )

// function Backdrop() {
//   const shadows = useRef()
//   useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
//   return (
//     <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
//       <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
//       <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
//     </AccumulativeShadows>
//   )
// }

// function CameraRig({ children }) {
//   const group = useRef()
//   const snap = useSnapshot(state)
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
//     easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
//   })
//   return <group ref={group}>{children}</group>
// }

// function Shirt(props) {
//   const snap = useSnapshot(state)
//   const texture = useTexture(`/${snap.decal}.png`)
//   const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
//   return (
//     <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
//       <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
//     </mesh>
//   )
// }

// useGLTF.preload('/shirt_baked_collapsed.glb')
// ;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)



// function Overlay() {
//   const snap = useSnapshot(state)
//   const transition = { type: 'spring', duration: 0.8 }
//   const config = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
//   }
//   return (
//     <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
//       <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
//         {/* <Logo width="40" height="40" /> */}
//         <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
//           <AiOutlineShopping size="3em" />
//         </motion.div>
//       </motion.header>
//       <AnimatePresence>
//         {snap.intro ? (
//           <motion.section key="main" {...config}>
//             <div className="section--container">
//               <motion.div
//                 key="title"
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
//                 <h1>LET'S DO IT.</h1>
//               </motion.div>
//               <div className="support--content">
//                 <motion.div
//                   key="p"
//                   initial={{ y: 100, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{
//                     type: 'spring',
//                     damping: 7,
//                     stiffness: 30,
//                     restDelta: 0.001,
//                     duration: 0.6,
//                     delay: 0.2,
//                     delayChildren: 0.2
//                   }}>
//                   <p>
//                     Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong> and define your
//                     own style.
//                   </p>
//                   <button style={{ background: snap.color }} onClick={() => (state.intro = false)}>
//                     CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
//                   </button>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.section>
//         ) : (
//           <motion.section key="custom" {...config}>
//             <Customizer />
//           </motion.section>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// function Customizer() {
//   const snap = useSnapshot(state)
//   return (
//     <div className="customizer">
//       <div className="color-options">
//         {snap.colors.map((color) => (
//           <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
//         ))}
//       </div>
//       <div className="decals">
//         <div className="decals--container">
//           {snap.decals.map((decal) => (
//             <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
//               <img src={decal + '_thumb.png'} alt="brand" />
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         className="share"
//         style={{ background: snap.color }}
//         onClick={() => {
//           const link = document.createElement('a')
//           link.setAttribute('download', 'canvas.png')
//           link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
//           link.click()
//         }}>
//         DOWNLOAD
//         <AiFillCamera size="1.3em" />
//       </button>
//       <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
//         GO BACK
//         <AiOutlineArrowLeft size="1.3em" />
//       </button>
//     </div>
//   )
// }