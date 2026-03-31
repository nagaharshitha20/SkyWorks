import React, { Suspense, useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// FIX: Import all of 'three' as THREE to avoid module resolution issues with 'Group'.
import * as THREE from 'three';

import { Scene } from './Scene';
import { Overlay } from './Overlay';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// The app is now ready for your custom model.
// Please add a `drone.glb` file to your project's root folder.
useGLTF.preload('/drone.glb');

export const Experience: React.FC = () => {
  // FIX: Use THREE.Group for the ref type.
  const sceneRef = useRef<THREE.Group>(null!);
  const overlayRef = useRef<HTMLDivElement>(null!);
  const canvasContainerRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (!sceneRef.current || !overlayRef.current || !canvasContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overlayRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      const scene = sceneRef.current;
      
      gsap.set(scene.rotation, { y: Math.PI / 4, z: -0.1 });
      gsap.set(scene.position, { z: -1 });

      tl
        .to(scene.rotation, { y: -Math.PI / 2, ease: 'power1.inOut' }, 0)
        .to(scene.position, { z: 2.5, ease: 'power1.inOut' }, 0)
        .to('.hero-section', { opacity: 0, y: '-=50', ease: 'power1.inOut' }, 0.2);

      tl
        .to('.showcase-section', { opacity: 1, y: 0, ease: 'power2.inOut'}, '>-=0.5')
        .to(scene.rotation, { y: Math.PI * 1.5, z: 0, ease: 'power2.inOut' }, 'showcase')
        .to(scene.position, { z: 0.5, ease: 'power2.inOut' }, 'showcase');

      const getPart = (name: string) => scene.getObjectByName(name);

      const propellerFR = getPart("Part_Propeller_FR");
      const propellerFL = getPart("Part_Propeller_FL");
      const propellerBR = getPart("Part_Propeller_BR");
      const propellerBL = getPart("Part_Propeller_BL");
      const camera = getPart("Part_Camera");
      const battery = getPart("Part_Battery");
      const mainBody = getPart("MainBody");

      tl
        .to('.showcase-section', { opacity: 0, y: '-=50' }, 'explode')
        .to('.exploded-section', { opacity: 1, y: 0, ease: 'power2.inOut' }, 'explode')
        .to(scene.rotation, { y: Math.PI * 2, z: 0.2, ease: 'power3.inOut' }, 'explode')
        .to(scene.position, { z: 3, x: 0.5, ease: 'power3.inOut' }, 'explode');

      // FIX: Add checks to ensure parts exist before creating animations for them.
      // This makes the animation robust, preventing crashes if the model is missing or has a different structure.
      if (propellerFR) tl.to(propellerFR.position, { x: 1, z: 1, y: 0.5 }, 'explode');
      if (propellerFL) tl.to(propellerFL.position, { x: -1, z: 1, y: 0.5 }, 'explode');
      if (propellerBR) tl.to(propellerBR.position, { x: 1, z: -1, y: 0.5 }, 'explode');
      if (propellerBL) tl.to(propellerBL.position, { x: -1, z: -1, y: 0.5 }, 'explode');
      if (camera) tl.to(camera.position, { z: 1.5, y: -0.2 }, 'explode');
      if (battery) tl.to(battery.position, { y: 1 }, 'explode');
      if (mainBody) tl.to(mainBody.position, { y: -0.5 }, 'explode');

      const partsToReset = [propellerFR, propellerFL, propellerBR, propellerBL, camera, battery, mainBody].filter(p => p);

       tl
        .to('.exploded-section', { opacity: 0, y: '-=50' }, 'shop')
        .to(scene.position, { z: 0, x: 0, y: 0, ease: 'power3.inOut' }, 'shop')
        .to(scene.rotation, { y: Math.PI * 2.25, z: 0, ease: 'power3.inOut' }, 'shop');
      
      if (partsToReset.length > 0) {
        tl.to(partsToReset.map(p => p.position), { x: 0, y: 0, z: 0, ease: 'power3.inOut' }, 'shop');
      }

       tl
        .to('.shop-section-content', { opacity: 0, y: '-=50', ease: 'power2.inOut' }, 'outro')
        .to(scene.rotation, { z: 0.1, x: -0.5, ease: 'power3.inOut'}, 'outro')
        .to(scene.position, { z: 15, y: 2, ease: 'power3.inOut'}, 'outro')
        .to(scene.scale, { x: 0.1, y: 0.1, z: 0.1, ease: 'power3.in'}, '>-=0.5')
        .to(canvasContainerRef.current, { opacity: 0, duration: 1}, 'outro');
      
      const animatedSections = overlayRef.current.querySelectorAll('.animated-section-home');
      animatedSections.forEach((section: any) => {
          gsap.fromTo(section, 
              { y: 50, opacity: 0 },
              { 
                  y: 0, 
                  opacity: 1,
                  duration: 1, 
                  ease: 'power3.out',
                  scrollTrigger: {
                      trigger: section,
                      start: 'top 85%',
                      toggleActions: 'play none none none',
                  }
              }
          );
      });

      const statsSection = overlayRef.current.querySelector('.stats-section');
      if (statsSection) {
           gsap.utils.toArray('.stat-number').forEach((el: any) => {
              const targetText = el.dataset.target;
              const target = parseFloat(targetText.replace(/[^0-9.]/g, ''));
              
              const isPercentage = targetText.includes('%');
              const hasPlus = targetText.includes('+');
              const counter = { val: 0 };
              
              if (isPercentage) el.textContent = '0.0%';
              else el.textContent = '0';

              gsap.to(counter, {
                  val: target,
                  duration: 2.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                      trigger: statsSection,
                      start: 'top 85%',
                      toggleActions: 'play none none none',
                  },
                  onUpdate: () => {
                      let text;
                      if (isPercentage) {
                          text = counter.val.toFixed(1) + '%';
                      } else {
                          text = Math.ceil(counter.val).toLocaleString();
                          if (hasPlus) text += '+';
                      }
                      el.textContent = text;
                  },
              });
          });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div ref={canvasContainerRef} className="w-full h-full fixed top-0 left-0 -z-10">
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 42 }}>
          <Suspense fallback={null}>
            <Scene ref={sceneRef} />
          </Suspense>
        </Canvas>
      </div>
      <Loader />
      <Overlay ref={overlayRef} />
    </>
  );
};
