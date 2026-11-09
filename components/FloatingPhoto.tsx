'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Billboard, Text, RoundedBox, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Photo } from '@/lib/photos';

export default function FloatingPhoto({ photo, onClick }: { photo: Photo, onClick: (p: Photo) => void }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Animasi melayang sangat halus (seperti tertiup angin)
    group.current.position.y = photo.position[1] + Math.sin(t * 0.5 + photo.position[0]) * 0.05;
    group.current.rotation.z = photo.rotation[2] + Math.sin(t * 0.3 + photo.position[1]) * 0.01;
  });

  const scale = (photo.scale ?? 1) * (hovered ? 1.05 : 1);

  return (
    <group ref={group} position={photo.position} rotation={photo.rotation} scale={scale}>
      <Billboard>
        {/* Rantai Gantungan Emas */}
        <Line points={[[0, 1, 0], [0, 1.8, 0]]} color="#d4af37" lineWidth={2} />
        
        {/* Paku Emas */}
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>

        {/* Bingkai Lukisan (Kayu Ukir) */}
        <RoundedBox args={[2.4, 3.2, 0.15]} radius={0.05}>
          <meshStandardMaterial color={hovered ? "#5c4033" : "#2c1e16"} roughness={0.8} metalness={0.2} />
        </RoundedBox>

        {/* Garis Emas Dalam Bingkai */}
        <RoundedBox args={[2.1, 2.9, 0.16]} radius={0.02} position={[0, 0, 0.01]}>
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.3} />
        </RoundedBox>

        {/* Foto (Passe-partout) */}
        <Image
          url={photo.src}
          transparent
          side={THREE.DoubleSide}
          scale={[1.8, 2.4]}
          position={[0, 0.1, 0.1]}
          onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
          onClick={(e) => { e.stopPropagation(); onClick(photo); }}
        />
        
        {/* Teks Tanggal (di bawah bingkai) */}
        <Text
          position={[0, -1.8, 0.1]}
          fontSize={0.2}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          fontStyle="italic"
        >
          {photo.date}
        </Text>
      </Billboard>
    </group>
  );
}