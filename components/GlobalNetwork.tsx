import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const GLOBE_RADIUS = 2;

// Data for locations, inspired by user's image
const locations = {
    'Seattle': { lat: 47.6042, lon: -122.3346, text: 'SEATTLE\n47.6042°N,\n122.3346°W' },
    'San Francisco': { lat: 37.6145, lon: -122.3945, text: 'SAN FRANCISCO •\nPALO ALTO\n37.6145°N,\n122.3945°W' },
    'Memphis': { lat: 35.1495, lon: -90.049, text: 'MEMPHIS\n35.1495°N,\n90.049°W' },
    'Europe': { lat: 51.5072, lon: -0.1276, text: '' }, // Abstract point for arc
    'Atlantic': { lat: 35.5, lon: -40.0, text: '' }, // Abstract point for second arc
};

// Connections between locations
const connections = [
    { start: 'Seattle', end: 'Memphis' },
    { start: 'San Francisco', end: 'Memphis' },
    { start: 'Memphis', end: 'Europe' },
    { start: 'Memphis', end: 'Atlantic' },
];

// Utility to convert latitude/longitude to a 3D vector on a sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}

// FIX: Use React.FC to correctly type component props and allow for the 'key' prop.
const Arc: React.FC<{ start: THREE.Vector3, end: THREE.Vector3 }> = ({ start, end }) => {
    const curve = useMemo(() => {
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);
        // Make the arc height proportional to the distance between points
        midpoint.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.4); 
        
        return new THREE.CatmullRomCurve3([start, midpoint, end]);
    }, [start, end]);

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.01, 8, false]} />
            <meshBasicMaterial color="#ff6600" toneMapped={false} />
        </mesh>
    );
};

// FIX: Use React.FC to correctly type component props and allow for the 'key' prop.
const LocationMarker: React.FC<{ position: THREE.Vector3, text: string }> = ({ position, text }) => {
    // Don't render a marker for abstract points that have no text
    if (!text) return null; 

    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial color="#ff6600" toneMapped={false} />
            </mesh>
            <Text
                position={[0.2, 0.1, 0]}
                color="white"
                anchorX="left"
                anchorY="top"
                fontSize={0.08}
                lineHeight={1.5}
            >
                {text}
            </Text>
        </group>
    );
};

const NetworkGlobe = () => {
    const groupRef = useRef<THREE.Group>(null!);

    // Slowly rotate the globe
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.05 * delta;
        }
    });

    // Memoize calculations for performance
    const points = useMemo(() => Object.entries(locations).map(([name, data]) => ({ name, ...data, position: latLonToVector3(data.lat, data.lon, GLOBE_RADIUS) })), []);
    const arcs = useMemo(() => connections.map(({ start, end }) => {
        const startPoint = points.find(p => p.name === start);
        const endPoint = points.find(p => p.name === end);
        if (!startPoint || !endPoint) return null;
        return { start: startPoint.position, end: endPoint.position };
    }).filter((c): c is { start: THREE.Vector3; end: THREE.Vector3 } => c !== null), [points]);
    
    // Initial rotation is set to focus on North America
    return (
        <group ref={groupRef} rotation={[0.4, -1.6, 0]} position={[0, -0.2, 0]}>
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshStandardMaterial wireframe color="#cccccc" transparent opacity={0.15} />
            </mesh>
            
            {points.map(point => <LocationMarker key={point.name} position={point.position} text={point.text} />)}
            {arcs.map((arc, i) => <Arc key={i} start={arc.start} end={arc.end} />)}
        </group>
    );
};

export const GlobalNetwork: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff6600" />
            <NetworkGlobe />
        </Canvas>
    );
};
