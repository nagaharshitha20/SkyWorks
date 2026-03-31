import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface DroneAnimationProps {
  scroll: number;
}

const DroneAnimation: React.FC<DroneAnimationProps> = ({ scroll }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const propellerMeshes = useRef<THREE.Mesh[]>([]);
  const meshes = useRef<THREE.Mesh[]>([]);
  const initialPositions = useRef<Map<THREE.Mesh, THREE.Vector3>>(new Map());
  const directionVectors = useRef<Map<THREE.Mesh, THREE.Vector3>>(new Map());
  const modelRef = useRef<THREE.Group | null>(null);
  const scrollRef = useRef(scroll);

  const propellerNames = ['Body_1_1', 'Body_1_21', 'Body_1_41', 'Body_1_61'];

  useEffect(() => {
    scrollRef.current = scroll;
  }, [scroll]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 5, 25); // Adjusted camera position

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 2, 0); // Target the center of the model
    controls.update();

    // --- Enhanced Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 15);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0x00BFFF, 0.4);
    fillLight.position.set(-10, -5, -10);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(0, 10, -15);
    scene.add(backLight);

    const loader = new GLTFLoader();
    loader.load(
      '/drone.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Adjust model properties for better lighting and shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const material = child.material as THREE.MeshStandardMaterial;
            material.metalness = 0.4; // Reduce metalness for less reflection
            material.roughness = 0.6; // Increase roughness for a more matte finish
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.scale.set(5, 5, 5);
        scene.add(model);

        // Populate meshes and positions after model is processed
        const modelBox = new THREE.Box3().setFromObject(model);
        const modelCenter = new THREE.Vector3();
        modelBox.getCenter(modelCenter);

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mesh = child;
              meshes.current.push(mesh);
              initialPositions.current.set(mesh, mesh.position.clone());

              const meshWorldPosition = new THREE.Vector3();
              mesh.getWorldPosition(meshWorldPosition);

              const direction = new THREE.Vector3().subVectors(meshWorldPosition, modelCenter).normalize();
              directionVectors.current.set(mesh, direction);

              if (propellerNames.includes(mesh.name)) {
                propellerMeshes.current.push(mesh);
              }
            }
        });
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error);
      }
    );

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentScroll = scrollRef.current;

      if (modelRef.current) {
        const progress = Math.max(0, Math.min(1, currentScroll / 100));

        // Animate model based on scroll
        if (currentScroll <= 25) {
            const phaseProgress = currentScroll / 25;
            modelRef.current.position.x = THREE.MathUtils.lerp(0, -10, phaseProgress);
            modelRef.current.position.y = THREE.MathUtils.lerp(2, 5, phaseProgress);
            modelRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 4, phaseProgress);

            meshes.current.forEach(mesh => {
                const initialPos = initialPositions.current.get(mesh);
                if (initialPos) mesh.position.copy(initialPos);
            });
        }
        else if (currentScroll > 25 && currentScroll <= 75) {
            const phaseProgress = (currentScroll - 25) / 50;
            const separation = THREE.MathUtils.lerp(0, 3.0, phaseProgress);

            meshes.current.forEach(mesh => {
                const initialPos = initialPositions.current.get(mesh);
                const direction = directionVectors.current.get(mesh);
                if (initialPos && direction) {
                    mesh.position.copy(initialPos).add(direction.clone().multiplyScalar(separation));
                }
            });

            meshes.current.forEach(mesh => {
                (mesh.material as THREE.MeshStandardMaterial).emissive.set(0x000000);
            });

            if (currentScroll > 30 && currentScroll <= 40) {
                const part = meshes.current.find(m => m.name === 'Body_1_1');
                if (part) (part.material as THREE.MeshStandardMaterial).emissive.set(0xff0000);
            } else if (currentScroll > 45 && currentScroll <= 55) {
                const part = meshes.current.find(m => m.name === 'Body_1_21');
                if (part) (part.material as THREE.MeshStandardMaterial).emissive.set(0x00ff00);
            } else if (currentScroll > 60 && currentScroll <= 70) {
                const part = meshes.current.find(m => m.name === 'Body_1_41');
                if (part) (part.material as THREE.MeshStandardMaterial).emissive.set(0x0000ff);
            }
        }
        else if (currentScroll > 75) {
            const phaseProgress = (currentScroll - 75) / 25;
            const separation = THREE.MathUtils.lerp(3.0, 0, phaseProgress);

            meshes.current.forEach(mesh => {
                const initialPos = initialPositions.current.get(mesh);
                const direction = directionVectors.current.get(mesh);
                if (initialPos && direction) {
                    mesh.position.copy(initialPos).add(direction.clone().multiplyScalar(separation));
                }
            });

            if (phaseProgress >= 1) {
                modelRef.current.position.y += Math.sin(elapsedTime * 3) * 0.02;
                propellerMeshes.current.forEach(propeller => {
                    propeller.rotation.y += 0.5;
                });
            }
        }
    }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      controls.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Clean up scene resources
      scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              (object.material as THREE.Material).dispose();
          }
      });
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} />;
};

export default DroneAnimation;
