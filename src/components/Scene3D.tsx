'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingParticles() {
  const meshRef = useRef<THREE.Points>(null);

  const count = 800;
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4ff57"
        size={0.03}
        transparent
        opacity={0.6}
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
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[3.5, 0, -2]}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial
        color="#d4ff57"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[-3, 1, -4]}>
      <torusGeometry args={[1.2, 0.15, 16, 48]} />
      <meshBasicMaterial
        color="#d4ff57"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

function SmallSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.8 + 2;
    meshRef.current.position.x = Math.cos(clock.getElapsedTime() * 0.2) * 0.5 + 4;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[4, 2, -3]}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial
        color="#d4ff57"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <FloatingParticles />
        <WireframeGeo />
        <FloatingTorus />
        <SmallSphere />
      </Canvas>
    </div>
  );
}
