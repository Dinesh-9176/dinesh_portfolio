import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Loading component
const Loader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>
);

// Earth model component
const EarthModel = () => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/earth-cartoon.glb');
  const { camera } = useThree();

  useEffect(() => {
    // Set up camera
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Set up model materials and lighting
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        // Improve material quality
        if (child.material) {
          const materials = Array.isArray(child.material) 
            ? child.material 
            : [child.material];

          materials.forEach((material) => {
            if ('map' in material && material.map) {
              material.map.anisotropy = 16;
              material.needsUpdate = true;
            }
            material.roughness = 0.5;
            material.metalness = 0.1;
          });
        }
      }
    });
  }, [scene, camera]);

  // Rotate the model
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} scale={[1.5, 1.5, 1.5]}>
      <primitive object={scene} />
    </group>
  );
};

// Scene component with lighting
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <EarthModel />
        <Environment preset="city" />
      </Suspense>
    </>
  );
};

export const ContactSphere = () => {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-stone-900 rounded-lg"></div>;
  }

  if (error) {
    return (
      <div className="w-full h-full bg-stone-900 rounded-lg flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-stone-900">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};