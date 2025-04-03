
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup function for when component unmounts
    return () => {
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x121212);
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add ambient and point lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Helper function to create glowing material
    function createGlowMaterial(color: number) {
      return new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.8 
      });
    }

    // 1. Document Icon (Input Stage)
    const docGeometry = new THREE.BoxGeometry(1, 1.3, 0.1);
    const docMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00aaff, 
      emissive: 0x004488, 
      emissiveIntensity: 0.5 
    });
    const documentMesh = new THREE.Mesh(docGeometry, docMaterial);
    documentMesh.position.set(-10, 0, 0); // Start off-screen left
    scene.add(documentMesh);

    // 2. Processing Hub (Cube)
    const hubGeometry = new THREE.BoxGeometry(3, 3, 3);
    const hubMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      wireframe: true, 
      opacity: 0.3, 
      transparent: true 
    });
    const processingHub = new THREE.Mesh(hubGeometry, hubMaterial);
    processingHub.position.set(0, 0, 0);
    scene.add(processingHub);

    // 3. Version Lanes (Output Stage)
    const lanes = [];
    const laneColors = [0x007BFF, 0x00FF00, 0x9B59B6]; // Example colors for PDF, DOCX, Markdown
    
    for (let i = 0; i < laneColors.length; i++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(3, (i - 1) * 2, -2 - i)
      ]);
      const laneGeometry = new THREE.TubeGeometry(curve, 20, 0.1, 8, false);
      const laneMaterial = createGlowMaterial(laneColors[i]);
      const laneMesh = new THREE.Mesh(laneGeometry, laneMaterial);
      laneMesh.position.set(1.5, 0, 0);
      scene.add(laneMesh);
      lanes.push(laneMesh);
    }

    // 4. Final Output Panels (Simplified as Planes)
    const panelGeometry = new THREE.PlaneGeometry(2, 1.5);
    const panelMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      side: THREE.DoubleSide 
    });
    const outputPanels = [];
    
    for (let i = 0; i < laneColors.length; i++) {
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(6, (i - 1) * 2, 0);
      scene.add(panel);
      outputPanels.push(panel);
    }

    // GSAP Animations
    // Animate document entering the scene
    gsap.to(documentMesh.position, { 
      duration: 3, 
      x: -1, 
      ease: "power2.inOut", 
      onComplete: () => {
        // Animate document into processing hub
        gsap.to(documentMesh.position, { 
          duration: 2, 
          x: 0, 
          ease: "power2.inOut", 
          onComplete: () => {
            // Simulate transformation by rotating the document inside the hub
            gsap.to(documentMesh.rotation, { 
              duration: 2, 
              y: Math.PI * 2, 
              ease: "power2.inOut", 
              onComplete: () => {
                // Animate document splitting into version lanes
                lanes.forEach((lane, index) => {
                  // Clone document for each lane
                  const docClone = documentMesh.clone();
                  scene.add(docClone);
                  // Animate clone along lane curve path
                  gsap.to(docClone.position, {
                    duration: 3,
                    x: outputPanels[index].position.x - 1,
                    y: outputPanels[index].position.y,
                    z: outputPanels[index].position.z,
                    ease: "power2.inOut"
                  });
                });
                // Optionally fade out the original document
                gsap.to(documentMesh.material, { 
                  duration: 1, 
                  opacity: 0, 
                  ease: "power2.inOut" 
                });
              }
            });
          }
        });
      }
    });

    // Animation loop
    function animate() {
      animationRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-24 flex items-center overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 z-[-2]">
        <div className="absolute inset-0 bg-gradient-to-br from-versionBgDark to-versionBgDarker opacity-90"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-versionBlue via-transparent to-transparent animate-pulse-light"></div>
      </div>
      
      {/* Floating particles - will be replaced by Three.js animation */}
      <div className="absolute inset-0 z-[-1]">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full bg-versionBlue bg-opacity-${10 + i * 5} animate-float`}
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* 3D Document Processing Visualization */}
          <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
              <span className="text-transparent bg-clip-text bg-version-gradient">3D Document Processing</span>
            </h1>
            
            {/* Three.js Container */}
            <div 
              ref={containerRef} 
              className="w-full h-[70vh] rounded-xl overflow-hidden glassmorphism mb-8"
            >
              {/* Three.js canvas will be injected here */}
            </div>
            
            {/* Version info labels */}
            <div className="w-full flex justify-between mt-4 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-3 w-3 bg-[#007BFF] rounded-full mx-auto mb-2"></div>
                <p className="text-gray-300">PDF v1.0</p>
              </div>
              <div className="text-center">
                <div className="h-3 w-3 bg-[#00FF00] rounded-full mx-auto mb-2"></div>
                <p className="text-gray-300">DOCX 2007</p>
              </div>
              <div className="text-center">
                <div className="h-3 w-3 bg-[#9B59B6] rounded-full mx-auto mb-2"></div>
                <p className="text-gray-300">Markdown v2.1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
