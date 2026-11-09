'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, ContactShadows, Sparkles, Image } from '@react-three/drei';
import * as THREE from 'three';

function GiftScene({ onExplode }: { onExplode: () => void }) {
  const chestBase = useRef<THREE.Group>(null);
  const chestLid = useRef<THREE.Group>(null);
  const shieldGroup = useRef<THREE.Group>(null);
  const [exploded, setExploded] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (!exploded) {
      if (chestBase.current && chestLid.current) {
        chestBase.current.position.y = Math.sin(t * 1.5) * 0.1;
        chestLid.current.position.y = Math.sin(t * 1.5) * 0.1;
      }
    } else {
      // 1. Peti Tenggelam ke Bawah Tanah (Posisi Y sangat rendah)
      if (chestBase.current) {
        chestBase.current.position.y = THREE.MathUtils.lerp(chestBase.current.position.y, -15, 0.05);
      }
      if (chestLid.current) {
        chestLid.current.rotation.x = THREE.MathUtils.lerp(chestLid.current.rotation.x, -Math.PI / 1.5, 0.05);
        chestLid.current.position.y = THREE.MathUtils.lerp(chestLid.current.position.y, -15, 0.05);
      }

      // 2. Perisai Muncul ke Tengah
      if (shieldGroup.current) {
        shieldGroup.current.position.y = THREE.MathUtils.lerp(shieldGroup.current.position.y, 0, 0.05);
        shieldGroup.current.scale.x = THREE.MathUtils.lerp(shieldGroup.current.scale.x, 0.9, 0.05);
        shieldGroup.current.scale.y = THREE.MathUtils.lerp(shieldGroup.current.scale.y, 0.9, 0.05);
        shieldGroup.current.scale.z = THREE.MathUtils.lerp(shieldGroup.current.scale.z, 0.9, 0.05);
        shieldGroup.current.rotation.y = Math.sin(t * 0.5) * 0.05;
      }
    }
  });

  return (
    <group onClick={() => { if (!exploded) { setExploded(true); onExplode(); } }}>
      
      {/* PETI HARTA KARUN */}
      <group>
        <group ref={chestBase}>
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 2, 2.5]} />
            <meshStandardMaterial color="#3e2723" roughness={0.9} />
          </mesh>
          {[-1.5, 0, 1.5].map((x, i) => (
            <mesh key={i} position={[x, -0.5, 0]} castShadow>
              <boxGeometry args={[0.2, 2.05, 2.55]} />
              <meshStandardMaterial color="#2c2c2c" metalness={0.8} roughness={0.5} />
            </mesh>
          ))}
        </group>
        <group ref={chestLid}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 1, 2.5]} />
            <meshStandardMaterial color="#3e2723" roughness={0.9} />
          </mesh>
          {[-1.5, 0, 1.5].map((x, i) => (
            <mesh key={i} position={[x, 0.5, 0]} castShadow>
              <boxGeometry args={[0.2, 1.05, 2.55]} />
              <meshStandardMaterial color="#2c2c2c" metalness={0.8} roughness={0.5} />
            </mesh>
          ))}
          <mesh position={[0, 0.1, 1.3]} castShadow>
            <boxGeometry args={[0.6, 0.8, 0.2]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* PERISAI KERAJAAN (Menghadap Depan) */}
      <group 
        ref={shieldGroup} 
        position={[0, -10, 0]} // Awalnya tersembunyi jauh di bawah
        scale={[0, 0, 0]}
      >
        {/* Bingkai Perisai Oktagon (Diputar 90 derajat agar menghadap kamera) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3.5, 3.5, 0.4, 8]} />
          <meshPhysicalMaterial color="#b8860b" metalness={1} roughness={0.3} clearcoat={1} />
        </mesh>
        
        {/* Bagian Dalam Kaca Akrilik */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
          <cylinderGeometry args={[3.2, 3.2, 0.4, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.6} />
        </mesh>

        {/* Konten Perisai (Diletakkan di Z: 0.3 agar berada di depan kaca) */}
        <Text position={[0, 2.4, 0.31]} fontSize={0.6} color="#d4af37" anchorX="center" anchorY="middle">
          ♛
        </Text>
        <Text position={[0, 1.7, 0.31]} fontSize={0.3} color="#d4af37" anchorX="center" anchorY="middle" fontStyle="italic">
          Salve!
        </Text>

        {/* Foto Profil dengan Bingkai Emas */}
        <mesh position={[0, 0.8, 0.28]}>
          <ringGeometry args={[0.62, 0.68, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>
        <Image 
          url="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=500&auto=format&fit=crop" 
          position={[0, 0.8, 0.3]} 
          scale={[1.2, 1.2]} 
          radius={0.6}
          toneMapped={false}
        />

        {/* Teks Nama */}
        <Text position={[0, -0.3, 0.31]} fontSize={0.35} color="#f4f4f4" anchorX="center" anchorY="middle">
          NAMA KAMU
        </Text>
        <Text position={[0, -0.7, 0.31]} fontSize={0.12} color="#a1a1aa" anchorX="center" anchorY="middle">
          Pembangun Kerajaan & Penakluk Rintangan
        </Text>
        
        {/* Teks Usia XVII */}
        <Text position={[0, -1.6, 0.31]} fontSize={0.7} color="#d4af37" anchorX="center" anchorY="middle">
          XVII
          <meshStandardMaterial metalness={1} roughness={0.2} emissive="#b8860b" emissiveIntensity={0.5} />
        </Text>

        <Sparkles count={50} scale={8} size={3} speed={0.3} color="#FFD700" opacity={0.6} />
      </group>

      <ContactShadows position={[0, -1.6, 0]} opacity={0.8} scale={10} blur={2.5} far={4} />
    </group>
  );
}

export default function Cake3D({ onExplode }: { onExplode: () => void }) {
  return (
    <div className="w-full h-screen cursor-pointer flex items-center justify-center">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]}>
        <Environment preset="night" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
        <pointLight position={[-5, 2, 5]} intensity={2} color="#ffaa00" />
        <Suspense fallback={null}>
          <GiftScene onExplode={onExplode} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}