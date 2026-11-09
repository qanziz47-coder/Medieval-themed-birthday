'use client';

import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Environment, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import FloatingPhoto from './FloatingPhoto';
import { photos, type Photo } from '@/lib/photos';

// Komponen Bola Sihir Melayang
function MagicOrb({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current && lightRef.current) {
      const t = state.clock.elapsedTime;
      // Melayang naik turun
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.2;
      // Cahaya berdenyut
      lightRef.current.intensity = 1.5 + Math.sin(t * 3) * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight ref={lightRef} color={color} distance={5} intensity={2} />
    </group>
  );
}

// Komponen Cahaya Lilin di Dinding
function CandleLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime;
      lightRef.current.intensity = 2 + Math.sin(t * 15) * 0.5 + Math.random() * 0.5;
    }
  });
  return (
    <group position={position}>
      <pointLight ref={lightRef} color="#ffaa00" distance={10} decay={2} />
      <mesh>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffdd55" />
      </mesh>
    </group>
  );
}

export default function FloatingGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <div className="relative w-full h-screen bg-[#050302] overflow-hidden">
      
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        
        {/* Pencahayaan Ruangan */}
        <ambientLight intensity={0.2} />
        <Environment preset="night" />
        <CandleLight position={[-6, 3, 0]} />
        <CandleLight position={[6, -3, 0]} />

        {/* Bola Sihir Melayang */}
        <MagicOrb position={[-4, 2, -3]} color="#60a5fa" /> {/* Biru */}
        <MagicOrb position={[4, 2, -3]} color="#f472b6" />  {/* Pink */}
        <MagicOrb position={[0, -3, -4]} color="#d4af37" /> {/* Emas */}

        {/* Partikel Debu Sihir */}
        <Sparkles count={100} scale={15} size={2} speed={0.3} color="#d4af37" opacity={0.4} />

        <Suspense fallback={null}>
          {photos.map((p) => (
            <FloatingPhoto key={p.id} photo={p} onClick={setSelected} />
          ))}
        </Suspense>

        <OrbitControls enablePan={false} enableZoom minDistance={4} maxDistance={16} autoRotate autoRotateSpeed={0.3} />
      </Canvas>

      {/* Judul Halaman */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-0 left-0 right-0 p-6 text-center pointer-events-none z-10 bg-gradient-to-b from-[#050302] to-transparent"
      >
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] tracking-widest">
          Foto apa gak tau
        </h1>
        <p className="text-amber-200/60 mt-2 text-sm md:text-lg font-garamond italic">
          ini jadi kenang kenangan.
        </p>
      </motion.div>

      {/* Modal Cerita */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#2c1e16] rounded-sm overflow-hidden max-w-lg w-full shadow-[0_0_50px_rgba(212,175,55,0.3)] border-4 border-[#d4af37]"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.src} alt={selected.caption} className="w-full aspect-[4/3] object-cover sepia-[0.2]" />
              <div className="p-6 relative">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-4" />
                <p className="text-[#fcd34d] text-lg font-cinzel tracking-widest mb-2">{selected.date}</p>
                <p className="text-amber-100 text-xl leading-relaxed font-garamond italic">"{selected.caption}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}