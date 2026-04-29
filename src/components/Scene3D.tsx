'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingParticles() {
  const meshRef = useRef<THREE.Points>(null);

  const count = 600;
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4ff57"
        size={0.025}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function WireframeGeo() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.06;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return (
    <mesh ref={meshRef} position={[5, 0, -3]}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial color="#d4ff57" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.04;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.15) * 2 - 15;
  });
  return (
    <mesh ref={meshRef} position={[-4, -15, -5]}>
      <torusGeometry args={[1.5, 0.12, 16, 48]} />
      <meshBasicMaterial color="#d4ff57" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

function FloatingTorus2() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.03;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.1) * 1.5 - 40;
  });
  return (
    <mesh ref={meshRef} position={[4, -40, -4]}>
      <torusGeometry args={[1.2, 0.1, 16, 48]} />
      <meshBasicMaterial color="#d4ff57" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

function SmallOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.8 - 25;
    meshRef.current.position.x = Math.cos(clock.getElapsedTime() * 0.15) * 0.5 + 5;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={meshRef} position={[5, -25, -3]}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshBasicMaterial color="#d4ff57" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function SmallOctahedron2() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.cos(clock.getElapsedTime() * 0.2) * 1 - 55;
    meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.6 - 5;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.25;
  });
  return (
    <mesh ref={meshRef} position={[-5, -55, -3]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#d4ff57" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <FloatingParticles />
        <WireframeGeo />
        <FloatingTorus />
        <FloatingTorus2 />
        <SmallOctahedron />
        <SmallOctahedron2 />
      </Canvas>
    </div>
  );
}
