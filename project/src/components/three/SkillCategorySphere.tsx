import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface SkillCategorySphereProps {
  skills: string[];
  color: string;
  position: [number, number, number];
  scale?: number;
}

const SkillCategorySphere: React.FC<SkillCategorySphereProps> = ({ 
  skills, 
  color, 
  position,
  scale = 1
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const count = skills.length;
  const radius = 1.5 * scale;
  
  // Calculate positions on a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even spacing
      const phi = Math.acos(1 - 2 * ((i + 0.5) / count));
      const theta = Math.PI * 2 * i * (1 + Math.sqrt(5)) / 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  // Create color variations based on the base color
  const colorVariations = useMemo(() => {
    const baseColor = new THREE.Color(color);
    return skills.map((_, i) => {
      const variation = baseColor.clone();
      const hue = (variation.getHSL({}).h + (i * 0.1)) % 1;
      variation.setHSL(hue, 0.8, 0.6);
      return variation;
    });
  }, [skills, color]);

  return (
    <group position={position} ref={groupRef}>
      {skills.map((skill, i) => {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        
        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.05 * scale, 12, 12]} />
              <meshStandardMaterial 
                color={colorVariations[i]} 
                emissive={colorVariations[i]}
                emissiveIntensity={0.5}
              />
            </mesh>
            <Text
              position={[0, 0.15 * scale, 0]}
              fontSize={0.1 * scale}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.5}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="center"
            >
              {skill.length > 10 ? `${skill.substring(0, 10)}...` : skill}
            </Text>
          </group>
        );
      })}
      
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={createConnectionsArray(positions, count, radius * 0.8)}
            count={count * 6}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2} 
        />
      </lineSegments>
    </group>
  );
};

// Helper function to create connections between points
const createConnectionsArray = (positions: Float32Array, count: number, maxDistance: number) => {
  const connections: number[] = [];
  const positionsArray: THREE.Vector3[] = [];
  
  // Convert to Vector3 array for easier calculations
  for (let i = 0; i < count; i++) {
    positionsArray.push(new THREE.Vector3(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    ));
  }
  
  // Create connections between nearby points
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const distance = positionsArray[i].distanceTo(positionsArray[j]);
      if (distance < maxDistance) {
        // Add line from point i to point j
        connections.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
  }
  
  return new Float32Array(connections);
};

export default SkillCategorySphere;
