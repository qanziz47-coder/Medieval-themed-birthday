'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function SpellbookModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.02;
    }
  });

  // Data Skill (Kiri)
  const skills = [
    { name: "ウェブ開発者", val: 85 },
    { name: "バックハンド", val: 60 },
    { name: "サイバー", val: 0.1 },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* ======================= */}
      {/* KULIT BUKU (LEATHER)    */}
      {/* ======================= */}
      <group position={[-2.4, -0.1, -0.2]} rotation={[0, 0.1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.4, 5.8, 0.15]} />
          <meshStandardMaterial color="#2c1e16" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>
      
      <group position={[2.4, -0.1, -0.2]} rotation={[0, -0.1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.4, 5.8, 0.15]} />
          <meshStandardMaterial color="#2c1e16" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>

      {/* ======================= */}
      {/* HALAMAN KIRI (SKILL)    */}
      {/* ======================= */}
      <group position={[-2.2, 0.1, 0]} rotation={[0, 0.08, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 5.4, 0.05]} />
          <meshStandardMaterial color="#e6d5b8" roughness={0.9} />
        </mesh>
        
        <Text position={[0, 2, 0.04]} fontSize={0.35} color="#3e2723" anchorX="center" fontStyle="italic">
          電力レベル
        </Text>
        <mesh position={[0, 1.5, 0.04]}>
          <planeGeometry args={[3.5, 0.03]} />
          <meshBasicMaterial color="#5c4033" />
        </mesh>

        {skills.map((s, i) => (
          <group key={i} position={[0, 0.8 - i * 1.1, 0.04]}>
            <Text position={[-1.8, 0, 0]} fontSize={0.2} color="#3e2723" anchorX="left">
              {s.name}
            </Text>
            <Text position={[1.8, 0, 0]} fontSize={0.2} color="#3e2723" anchorX="right">
              {s.val}%
            </Text>
            <mesh position={[0, -0.2, 0]}>
              <planeGeometry args={[3.6, 0.06]} />
              <meshBasicMaterial color="#a89f91" />
            </mesh>
            <mesh position={[-1.8 + (3.6 * (s.val/100))/2, -0.2, 0.01]}>
              <planeGeometry args={[3.6 * (s.val/100), 0.06]} />
              <meshBasicMaterial color={s.name === "サイバー" ? "#8b0000" : "#d4af37"} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ======================= */}
      {/* HALAMAN KANAN (JURNAL)  */}
      {/* ======================= */}
      <group position={[2.2, 0.1, 0]} rotation={[0, -0.08, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 5.4, 0.05]} />
          <meshStandardMaterial color="#e6d5b8" roughness={0.9} />
        </mesh>
        
        {/* Judul Jurnal */}
        <Text position={[0, 2, 0.04]} fontSize={0.35} color="#3e2723" anchorX="center" fontStyle="italic">
          旅の記録
        </Text>
        
        {/* Garis Pembatas Judul */}
        <mesh position={[0, 1.5, 0.04]}>
          <planeGeometry args={[3.5, 0.03]} />
          <meshBasicMaterial color="#5c4033" />
        </mesh>

        {/* ISI JURNAL (Teks Paragraf) */}
        <group position={[0, 0.5, 0.04]}>
          {/* Paragraf 1 */}
          <Text 
            position={[0, 0.6, 0]} 
            fontSize={0.12} 
            color="#3e2723" 
            maxWidth={3.5} 
            lineHeight={1.5}
            anchorX="center"
            anchorY="top"
            textAlign="justify"
          >
Kadang kehidupan tidak selalu berjalan sesuai harapan. Kita dituntut untuk tampak sempurna,
namun justru tuntutan itulah yang kerap membuat hidup terasa begitu berat.
Sebagai manusia, kita harus menyadari bahwa kita hanyalah makhluk yang lemah di hadapan Tuhan. 
Justru dengan berdoa dan senantiasa memohon kepada-Nya, kita akan diberikan kemudahan dalam menjalani hidup.
Begitu pula dengan umur. Setiap detik yang berlalu adalah anugerah, 
dan setiap doa adalah penguat langkah kita. semoga kehidupan aku selanjutnya aku bisa lebih baik lagi dan 2027 akan menjadi 
tahun mungkin lebih baik lagi dari 2026??
          </Text>
        </group>

        {/* Tanda Tangan */}
        <Text position={[0, -2.2, 0.04]} fontSize={0.15} color="#5c4033" anchorX="center" fontStyle="italic">
          - Fajri -
        </Text>
      </group>

      {/* ======================= */}
      {/* TULANG BUKU & PITA      */}
      {/* ======================= */}
      <mesh position={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.4, 5.8, 0.3]} />
        <meshStandardMaterial color="#1a120b" roughness={0.6} />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 5.4, 0.1]} />
        <meshStandardMaterial color="#8b0000" roughness={0.5} />
      </mesh>

      <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ======================= */}
      {/* EFEK SIHIR (SPARKLES)   */}
      {/* ======================= */}
      <Sparkles count={80} scale={10} size={3} speed={0.4} color="#fcd34d" opacity={0.6} />

    </group>
  );
}

export default function MagicBook3D() {
  return (
    <div className="w-full h-[700px] cursor-move relative">
      
      <Canvas shadows camera={{ position: [0, 4, 14], fov: 45 }}>
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-6, 2, 5]} intensity={3} color="#ff8800" distance={15} />
        <pointLight position={[6, 5, -5]} intensity={2} color="#60a5fa" distance={20} />

        <Suspense fallback={null}>
          <group rotation={[0.1, -0.2, 0.05]}>
            <SpellbookModel />
          </group>
        </Suspense>
        
        <ContactShadows position={[0, -2.8, 0]} opacity={0.9} scale={15} blur={3} far={5} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minDistance={6}
          maxDistance={20}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.1} 
        />
      </Canvas>

      <div className="absolute top-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-[#fcd34d] font-garamond italic text-xl animate-pulse drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]">
          Putar dengan mouse atau scroll untuk zoom
        </p>
      </div>
    </div>
  );
}