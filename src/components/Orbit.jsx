// Orbit.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Orbit = () => {
  const pointsRef = useRef();
  const numParticles = 1000;

  const positions = useMemo(() => {
    const arr = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const radius = Math.random() * 3 + 1;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4;

      arr[i * 3] = radius * Math.cos(angle);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = radius * Math.sin(angle);
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.03,
    });
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};

export default Orbit;
