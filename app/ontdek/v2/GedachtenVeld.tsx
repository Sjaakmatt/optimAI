'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random';

/**
 * Het gedachtenveld bij halte 2: een compacte wolk van zachte, ronde
 * deeltjes die traag om elkaar draaien boven het bankje. Laag budget,
 * alleen gemount terwijl de halte in de buurt is.
 */

const AANTAL = 150;

function Deeltjes({ actief }: { actief: boolean }) {
  const groep = useRef<THREE.Group>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const posities = useMemo(
    () => random.inSphere(new Float32Array(AANTAL * 3), { radius: 0.75 }) as Float32Array,
    [],
  );

  useFrame((state, delta) => {
    if (groep.current) {
      groep.current.rotation.y += delta * 0.16;
      groep.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
    }
    if (mat.current) {
      mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, actief ? 0.8 : 0, 0.05);
    }
  });

  return (
    <group ref={groep} position={[-0.5, 0.45, 0]}>
      <Points positions={posities} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={mat}
          transparent
          color="#a8803a"
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
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
