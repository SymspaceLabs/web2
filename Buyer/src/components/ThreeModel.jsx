'use client'

import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three-stdlib';

const ThreeModel = () => {
  // const mountRef = useRef(null);
  // const modelRef = useRef(null);
  // const resizeObserverRef = useRef(null);

  // useEffect(() => {
  //   const mount = mountRef.current;

  //   // Scene setup
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
  //   camera.position.z = 5;

  //   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  //   renderer.setSize(mount.clientWidth, mount.clientHeight);
  //   renderer.setClearColor(0x000000, 0); // Transparent background
  //   mount.appendChild(renderer.domElement);

  //   // Add lighting
  //   const light = new THREE.DirectionalLight(0xffffff, 1);
  //   light.position.set(1, 1, 1).normalize();
  //   scene.add(light);

  //   // Load 3D model
  //   const loader = new GLTFLoader();
  //   loader.load('/scene2.glb', (gltf) => {
  //     modelRef.current = gltf.scene;
  //     modelRef.current.scale.set(1, 1, 1); // Adjust the scale as needed
  //     scene.add(gltf.scene);
  //   }, undefined, (error) => {
  //     console.error('Error loading model:', error);
  //   });

  //   // Animation loop
  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     renderer.render(scene, camera);
  //   };

  //   animate();

  //   // Mouse move event listener
  //   const onMouseMove = (event) => {
  //     if (modelRef.current) {
  //       const { clientX, clientY } = event;
  //       const { width, height } = mount.getBoundingClientRect();
  //       const mouseX = (clientX / width) * 2 - 1;
  //       const mouseY = -(clientY / height) * 2 + 1;

  //       modelRef.current.rotation.y = mouseX * Math.PI; // Rotate around Y axis
  //       modelRef.current.rotation.x = mouseY * Math.PI / 4; // Rotate around X axis
  //     }
  //   };

  //   mount.addEventListener('mousemove', onMouseMove);

  //   // Resize handling
  //   const handleResize = () => {
  //     if (mount && renderer && camera) {
  //       const { clientWidth, clientHeight } = mount;
  //       renderer.setSize(clientWidth, clientHeight);
  //       camera.aspect = clientWidth / clientHeight;
  //       camera.updateProjectionMatrix();
  //     }
  //   };

  //   resizeObserverRef.current = new ResizeObserver(handleResize);
  //   resizeObserverRef.current.observe(mount);

  //   // Cleanup
  //   return () => {
  //     mount.removeChild(renderer.domElement);
  //     mount.removeEventListener('mousemove', onMouseMove);
  //     if (resizeObserverRef.current) {
  //       resizeObserverRef.current.disconnect();
  //     }
  //   };
  // }, []);

  // return <div ref={mountRef} style={{ width: '100%', height: '350px' }} />;
  return <></>;
};

export default ThreeModel;
