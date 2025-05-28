import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const skills = [
  'React', 'Three.js', 'TypeScript', 
  'WebGL', 'Node.js', 'GSAP',
  'Tailwind', 'JavaScript', 'HTML',
  'CSS', 'MongoDB', 'Express',
  'Framer Motion', 'Git', 'Blender'
];

const SkillsSphere = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create a geometry for the points
  const count = skills.length;
  const radius = 2;
  
  // Calculate positions on a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even spacing
      const phi = Math.acos(1 - 2 * (i / count));
      const theta = Math.PI * 2 * i * (1 + Math.sqrt(5));
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {skills.map((skill, i) => {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        
        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial 
                color={new THREE.Color().setHSL(i * 0.1, 0.8, 0.5)} 
                emissive={new THREE.Color().setHSL(i * 0.1, 0.8, 0.5)}
                emissiveIntensity={0.5}
              />
            </mesh>
            <Text
              position={[0, 0.15, 0]}
              fontSize={0.12}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          </group>
        );
      })}
      
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={createConnectionsArray(positions, count)}
            count={count * 6}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.2} 
        />
      </lineSegments>
    </group>
  );
};

// Helper function to create connections between points
const createConnectionsArray = (positions, count) => {
  const connections = new Float32Array(count * 6);
  
  for (let i = 0; i < count; i++) {
    // Connect to next point
    connections[i * 6] = positions[i * 3];
    connections[i * 6 + 1] = positions[i * 3 + 1];
    connections[i * 6 + 2] = positions[i * 3 + 2];
    
    const nextPoint = (i + 1) % count;
    connections[i * 6 + 3] = positions[nextPoint * 3];
    connections[i * 6 + 4] = positions[nextPoint * 3 + 1];
    connections[i * 6 + 5] = positions[nextPoint * 3 + 2];
  }
  
  return connections;
};

import { useMemo } from 'react';

export default SkillsSphere;