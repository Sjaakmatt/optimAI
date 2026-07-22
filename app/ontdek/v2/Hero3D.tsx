'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * De ademende kern van de agent: een zacht vervormende orb in oker en
 * terra, met bloom en muisparallax. Alleen client-side gemount (via
 * next/dynamic in Held.tsx) en gepauzeerd zodra de hero uit beeld is.
 * In de rustige modus wordt dit component niet gemount; daar staat een
 * getekende poster (zie Held.tsx).
 */

function Orb() {
  const groep = useRef<THREE.Group>(null);
  const muis = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      muis.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      muis.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state) => {
    if (!groep.current) return;
    const t = state.clock.elapsedTime;
    // ademen + traag draaien + zacht naar de muis toe leunen
    const adem = 1 + Math.sin(t * 0.9) * 0.035;
    groep.current.scale.setScalar(adem);
    groep.current.rotation.y += 0.0022;
    groep.current.rotation.x = THREE.MathUtils.lerp(
      groep.current.rotation.x,
      muis.current.y * 0.22,
      0.04,
    );
    groep.current.rotation.z = THREE.MathUtils.lerp(
      groep.current.rotation.z,
      muis.current.x * -0.16,
      0.04,
    );
  });

  return (
    <group ref={groep}>
      <mesh>
        <icosahedronGeometry args={[1.15, 24]} />
        <MeshDistortMaterial
          color="#c9a55e"
          emissive="#a15842"
          emissiveIntensity={0.3}
          roughness={0.26}
          metalness={0.08}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
      {/* dunne inktring eromheen, als een getekende baan */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[1.75, 0.008, 8, 120]} />
        <meshBasicMaterial color="#7d5e24" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, 0.3, -0.2]}>
        <torusGeometry args={[2.05, 0.005, 8, 120]} />
        <meshBasicMaterial color="#6f6555" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const [zichtbaar, setZichtbaar] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setZichtbaar(e.isIntersecting), {
      rootMargin: '80px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.1], fov: 42 }}
        frameloop={zichtbaar ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.85} color="#f7ecd6" />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#f4ede0" />
        <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#a15842" />
        <group position={[0, 1.05, 0]}>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.55}>
            <Orb />
          </Float>
        </group>
        <EffectComposer>
          <Bloom intensity={0.55} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
