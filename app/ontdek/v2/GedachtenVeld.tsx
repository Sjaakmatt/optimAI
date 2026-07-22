'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as random from 'maath/random';

/**
 * Het gedachtenveld bij halte 2: een wolk van deeltjes die traag om
 * elkaar draaien terwijl de agent nadenkt. Instanced points, laag
 * budget, alleen gemount terwijl de halte in de buurt is.
 */

const AANTAL = 260;

function Deeltjes({ actief }: { actief: boolean }) {
  const punten = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const posities = useMemo(
    () => random.inSphere(new Float32Array(AANTAL * 3), { radius: 1.6 }) as Float32Array,
    [],
  );

  useFrame((state, delta) => {
    if (punten.current) {
      punten.current.rotation.y += delta * 0.12;
      punten.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
    if (mat.current) {
      mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, actief ? 0.85 : 0, 0.05);
    }
  });

  return (
    <points ref={punten}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posities, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.035}
        color="#a8803a"
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GedachtenVeld({ actief }: { actief: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 50 }} gl={{ alpha: true }}>
        <Deeltjes actief={actief} />
      </Canvas>
    </div>
  );
}
