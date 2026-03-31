
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const TechnologyDroneAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    mountRef.current.appendChild( renderer.domElement );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);

    // --- Ground ---
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    scene.add(ground);

    const loader = new GLTFLoader();
    let model;
    const meshes = [];
    const originalPositions = new Map();
    const fallenPositions = new Map();

    loader.load(
        '/drone.glb',
        function ( gltf ) {
            model = gltf.scene;
            model.scale.set(10, 10, 10);
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            controls.target.copy(center);

            model.updateMatrixWorld(true);

            model.traverse((child) => {
                if (child.isMesh) {
                    meshes.push(child);
                    originalPositions.set(child, child.position.clone());
                    
                    const worldPosition = new THREE.Vector3();
                    child.getWorldPosition(worldPosition);

                    const fallenWorldPos = new THREE.Vector3(worldPosition.x, ground.position.y + 0.1, worldPosition.z);

                    const parentInverseWorldMatrix = new THREE.Matrix4();
                    if (child.parent) {
                        parentInverseWorldMatrix.copy(child.parent.matrixWorld).invert();
                    }
                    
                    const fallenLocalPos = fallenWorldPos.clone().applyMatrix4(parentInverseWorldMatrix);
                    fallenPositions.set(child, fallenLocalPos);
                }
            });
            // Start with the drone disassembled
            disassemble();
        },
        undefined,
        function ( error ) {
            console.error( error );
        }
    );

    const disassemble = () => {
        meshes.forEach(mesh => {
            const fallenPos = fallenPositions.get(mesh);
            if (fallenPos) {
                mesh.position.copy(fallenPos);
            }
        });
    }

    const assemble = (scroll) => {
        const totalMeshes = meshes.length;
        const animatedMeshes = Math.floor(scroll * totalMeshes);

        meshes.forEach((mesh, index) => {
            const originalPos = originalPositions.get(mesh);
            const fallenPos = fallenPositions.get(mesh);

            if(originalPos && fallenPos) {
                if (index < animatedMeshes) {
                    mesh.position.copy(originalPos);
                } else {
                    mesh.position.copy(fallenPos);
                }
            }
        });
    }

    const animate = () => {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    };
    animate();

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scroll = scrollY / height;
        
        assemble(scroll);
    };

    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
        if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default TechnologyDroneAnimation;

