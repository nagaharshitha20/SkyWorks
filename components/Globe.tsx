import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Marker = ({ position }: { position: [number, number, number] }) => {
    const markerRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if(markerRef.current) {
            markerRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 5) * 0.15);
        }
    });

    return (
        <mesh ref={markerRef} position={position}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#00BFFF" toneMapped={false} />
        </mesh>
    );
};

const RotatingSphere = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const [colorMap, specularMap] = useTexture([
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg',
      'https://raw.githubusercontent.com/turban/webgl-earth/master/images/water_4k.png'
    ]);


    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.1 * delta;
        }
    });

    const lat = 37.3875; // Aero Valley, CA (using Silicon Valley coords)
    const lon = -122.084;
    const radius = 1.5;

    const latRad = lat * (Math.PI / 180);
    const lonRad = -lon * (Math.PI / 180);

    const x = radius * Math.cos(latRad) * Math.sin(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.cos(lonRad);
    
    // Shader for atmospheric glow
    const vertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        gl_FragColor = vec4(0.0, 0.749, 1.0, 1.0) * intensity;
      }
    `;


    return (
        <group ref={groupRef}>
            {/* Atmosphere */}
            <mesh scale={1.05}>
                 <sphereGeometry args={[radius, 64, 64]} />
                 <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                 />
            </mesh>
            {/* Textured Earth */}
            <mesh>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshPhongMaterial 
                    map={colorMap} 
                    specularMap={specularMap}
                    shininess={50}
                    specular={new THREE.Color('grey')}
                />
            </mesh>
            <Marker position={[x, y, z]} />
        </group>
    );
};

export const Globe: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
            <ambientLight intensity={0.1} />
            <directionalLight position={[5, 3, 5]} intensity={1.5} />
            <RotatingSphere />
        </Canvas>
    );
};