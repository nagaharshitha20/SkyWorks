// FIX: Import 'react' before other libraries that extend JSX to ensure the base namespace is established first.
// The global JSX augmentation for React Three Fiber is now handled in App.tsx.
import React, { forwardRef, useMemo } from 'react';
import { useGLTF, Environment } from '@react-three/drei';
// FIX: Import all of 'three' as THREE to avoid module resolution issues with 'Group'.
import * as THREE from 'three';

// You can find free drone models on sites like Sketchfab.
// This example is structured assuming the model has named parts like:
// MainBody, Part_Propeller_FR, Part_Propeller_FL, etc.
// You might need to adjust the names in Experience.tsx based on your model's structure.

// FIX: Use THREE.Group for the ref type in forwardRef.
export const Scene = forwardRef<THREE.Group, {}>((props, ref) => {
  const { scene } = useGLTF('/drone.glb');

  // FIX: Clone the scene to avoid mutating the cached model.
  // This is best practice when you intend to manipulate the scene graph.
  // Also, traverse the cloned scene to set shadow properties on all meshes.
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);


  return (
    <group {...props} ref={ref}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#00aaff" />
      
      {/* 
        FIX: The primitive is now nested inside the ref-forwarded group.
        This provides a stable parent for animations, preventing errors related to
        mutating read-only properties on the cached GLTF scene object.
      */}
      <primitive object={clonedScene} dispose={null} scale={1.5} />
      
      <Environment preset="city" />
    </group>
  );
});

Scene.displayName = 'Scene';
