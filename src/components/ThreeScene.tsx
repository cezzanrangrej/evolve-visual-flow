
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x1EAEDB, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 25;
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x1EAEDB, 2, 20);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x8B5CF6, 2, 20);
    pointLight2.position.set(5, 5, -5);
    scene.add(pointLight2);
    
    // Create factory floor
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Create main conveyor belt
    const createConveyorBelt = (x = 0, y = 0, z = 0, width = 12, depth = 2) => {
      const group = new THREE.Group();
      
      // Belt
      const beltGeometry = new THREE.BoxGeometry(width, 0.1, depth);
      const beltMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.5,
        metalness: 0.8
      });
      const belt = new THREE.Mesh(beltGeometry, beltMaterial);
      belt.position.y = 0.05;
      belt.receiveShadow = true;
      group.add(belt);
      
      // Gold rims
      const rimGeometry = new THREE.CylinderGeometry(0.15, 0.15, depth + 0.2, 16);
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        roughness: 0.3,
        metalness: 0.8
      });
      
      // Left side rims
      const leftRim1 = new THREE.Mesh(rimGeometry, rimMaterial);
      leftRim1.rotation.x = Math.PI / 2;
      leftRim1.position.set(-width/2, 0, 0);
      leftRim1.castShadow = true;
      group.add(leftRim1);
      
      const leftRim2 = new THREE.Mesh(rimGeometry, rimMaterial);
      leftRim2.rotation.x = Math.PI / 2;
      leftRim2.position.set(-width/2 + 0.3, 0, 0);
      leftRim2.castShadow = true;
      group.add(leftRim2);
      
      // Right side rims
      const rightRim1 = new THREE.Mesh(rimGeometry, rimMaterial);
      rightRim1.rotation.x = Math.PI / 2;
      rightRim1.position.set(width/2, 0, 0);
      rightRim1.castShadow = true;
      group.add(rightRim1);
      
      const rightRim2 = new THREE.Mesh(rimGeometry, rimMaterial);
      rightRim2.rotation.x = Math.PI / 2;
      rightRim2.position.set(width/2 - 0.3, 0, 0);
      rightRim2.castShadow = true;
      group.add(rightRim2);
      
      // Add glowing strip
      const stripGeometry = new THREE.BoxGeometry(width - 1, 0.05, 0.2);
      const stripMaterial = new THREE.MeshBasicMaterial({
        color: 0x1EAEDB,
        transparent: true,
        opacity: 0.8
      });
      const strip = new THREE.Mesh(stripGeometry, stripMaterial);
      strip.position.set(0, 0.11, 0.5);
      group.add(strip);
      
      group.position.set(x, y, z);
      return group;
    };
    
    const mainConveyor = createConveyorBelt(0, 0, 0, 14, 2);
    scene.add(mainConveyor);
    
    const sideConveyor = createConveyorBelt(5, 0, -4, 4, 1.5);
    sideConveyor.rotation.y = Math.PI / 2;
    scene.add(sideConveyor);
    
    // Create processing machines
    const createMachine = (x = 0, y = 0, z = 0, type = 'processor') => {
      const group = new THREE.Group();
      group.userData = { type: type };
      
      // Base
      const baseGeometry = new THREE.BoxGeometry(2, 3, 2);
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.2,
        metalness: 0.8
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 1.5;
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);
      
      // Screen
      const screenGeometry = new THREE.PlaneGeometry(1.5, 1);
      const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x1EAEDB,
        transparent: true,
        opacity: 0.8,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(0, 2, 1.01);
      group.add(screen);
      
      // Display graphics based on machine type
      if (type === 'processor') {
        // Add processor cubes on top
        for (let i = 0; i < 3; i++) {
          const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const cubeMaterial = new THREE.MeshStandardMaterial({
            color: 0x1EAEDB,
            emissive: 0x1EAEDB,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9
          });
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.set(i * 0.6 - 0.6, 3.3, 0);
          cube.castShadow = true;
          group.add(cube);
        }
        
        // Add graph lines on screen
        const graphGeometry = new THREE.BufferGeometry();
        const graphPoints = [];
        
        for (let i = 0; i < 10; i++) {
          graphPoints.push(
            -0.7 + i * 0.15, Math.sin(i * 0.5) * 0.2, 1.02,
            -0.7 + (i + 1) * 0.15, Math.sin((i + 1) * 0.5) * 0.2, 1.02
          );
        }
        
        graphGeometry.setAttribute('position', new THREE.Float32BufferAttribute(graphPoints, 3));
        const graphMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const graph = new THREE.LineSegments(graphGeometry, graphMaterial);
        graph.position.y = 2;
        group.add(graph);
      } 
      else if (type === 'analyzer') {
        // Add bar chart on screen
        for (let i = 0; i < 5; i++) {
          const barHeight = 0.2 + Math.random() * 0.6;
          const barGeometry = new THREE.BoxGeometry(0.15, barHeight, 0.01);
          const barMaterial = new THREE.MeshBasicMaterial({ color: 0x1EAEDB });
          const bar = new THREE.Mesh(barGeometry, barMaterial);
          bar.position.set(-0.5 + i * 0.25, 1.9 - 0.1 + barHeight / 2, 1.02);
          group.add(bar);
        }
        
        // Add control knob
        const knobGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const knobMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,
          roughness: 0.1,
          metalness: 0.5
        });
        const knob = new THREE.Mesh(knobGeometry, knobMaterial);
        knob.position.set(0, 1, 1.2);
        knob.castShadow = true;
        group.add(knob);
        
        // Add ring around knob
        const ringGeometry = new THREE.RingGeometry(0.35, 0.4, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x1EAEDB,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0, 1, 1.3);
        group.add(ring);
      }
      else if (type === 'data') {
        // Create pie charts
        const pieGeometry1 = new THREE.CircleGeometry(0.3, 32);
        const pieMaterial1 = new THREE.MeshBasicMaterial({ color: 0x1EAEDB });
        const pie1 = new THREE.Mesh(pieGeometry1, pieMaterial1);
        pie1.position.set(-0.4, 2, 1.02);
        group.add(pie1);
        
        const pieGeometry2 = new THREE.CircleGeometry(0.3, 32, 0, Math.PI * 1.5);
        const pieMaterial2 = new THREE.MeshBasicMaterial({ color: 0x8B5CF6 });
        const pie2 = new THREE.Mesh(pieGeometry2, pieMaterial2);
        pie2.position.set(0.4, 2, 1.02);
        group.add(pie2);
        
        // Add cooling fins on sides
        for (let i = 0; i < 4; i++) {
          const finGeometry = new THREE.BoxGeometry(2.2, 0.1, 0.4);
          const finMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.4,
            metalness: 0.6
          });
          const fin = new THREE.Mesh(finGeometry, finMaterial);
          fin.position.set(0, 0.5 + i * 0.5, 0);
          fin.castShadow = true;
          group.add(fin);
        }
      }
      
      // Position the machine
      group.position.set(x, y, z);
      return group;
    };
    
    const mainProcessor = createMachine(-3, 0, 0, 'processor');
    scene.add(mainProcessor);
    
    const dataAnalyzer = createMachine(5, 0, -2, 'analyzer');
    scene.add(dataAnalyzer);
    
    const dataVisualizer = createMachine(-3, 0, -4, 'data');
    scene.add(dataVisualizer);
    
    // Create movable elements (cubes)
    const createMovableCube = (color = 0x1EAEDB, size = 0.8) => {
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      return cube;
    };
    
    // Create spheres
    const createSphere = (color = 0xD4AF37, size = 0.6) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.1,
        metalness: 0.9
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.castShadow = true;
      return sphere;
    };
    
    // Moving objects for animation
    const movingObjects = [];
    
    // Entry cube (brown)
    const entryCube = createMovableCube(0x8B4513);
    entryCube.position.set(-6, 0.45, 0);
    scene.add(entryCube);
    movingObjects.push({ mesh: entryCube, speed: 0.02, path: 'main' });
    
    // Processing cube (white/cyan)
    const processingCube = createMovableCube(0xFFFFFF);
    processingCube.position.set(-3, 1, 0);
    processingCube.visible = false;
    scene.add(processingCube);
    
    // Gold sphere
    const goldSphere = createSphere(0xD4AF37);
    goldSphere.position.set(3, 0.45, 0);
    goldSphere.visible = false;
    scene.add(goldSphere);
    movingObjects.push({ mesh: goldSphere, speed: 0.04, path: 'side', delay: 3 });
    
    // Exit cube (teal)
    const exitCube = createMovableCube(0x1EAEDB, 0.6);
    exitCube.position.set(5, 0.45, -6);
    exitCube.visible = false;
    scene.add(exitCube);
    
    // Smaller storage container at bottom right
    const createStorageBox = () => {
      const group = new THREE.Group();
      
      // Container
      const boxGeometry = new THREE.BoxGeometry(2, 1, 3);
      const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.7
      });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.castShadow = true;
      box.receiveShadow = true;
      group.add(box);
      
      // Add some objects inside
      const shapes = [
        { shape: 'cube', color: 0x1EAEDB, pos: [-0.5, 0.6, -0.8] },
        { shape: 'cube', color: 0xFFFFFF, pos: [0.5, 0.6, -0.2] },
        { shape: 'sphere', color: 0xD4AF37, pos: [0, 0.6, 0.5] }
      ];
      
      shapes.forEach(item => {
        let object;
        if (item.shape === 'cube') {
          object = createMovableCube(item.color, 0.4);
        } else {
          object = createSphere(item.color, 0.3);
        }
        object.position.set(...item.pos);
        group.add(object);
      });
      
      return group;
    };
    
    const storageBox = createStorageBox();
    storageBox.position.set(5, 0.5, -6);
    scene.add(storageBox);
    
    // Particles for visual effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x1EAEDB,
      transparent: true,
      opacity: 0.6,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Raycaster for hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Mouse move handler for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the raycaster with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Get all the meshes we want to check for intersection
      const machines = [mainProcessor, dataAnalyzer, dataVisualizer];
      const intersects = raycaster.intersectObjects(machines, true);
      
      if (intersects.length > 0) {
        // Find the parent group that has the userData
        let parent = intersects[0].object;
        while(parent && !parent.userData?.type) {
          parent = parent.parent as THREE.Mesh;
        }
        
        if(parent && parent.userData?.type) {
          // Display tooltip based on machine type
          let tooltipText = '';
          switch(parent.userData.type) {
            case 'processor':
              tooltipText = 'Main Processing Unit';
              break;
            case 'analyzer':
              tooltipText = 'Data Analysis Station';
              break;
            case 'data':
              tooltipText = 'Version Visualization System';
              break;
            default:
              tooltipText = 'Factory Component';
          }
          
          setHoveredElement(tooltipText);
          setTooltipPosition({ x: event.clientX, y: event.clientY });
          setShowTooltip(true);
          
          // Highlight effect (subtle scale)
          parent.scale.set(1.05, 1.05, 1.05);
        }
      } else {
        // Reset all objects
        [mainProcessor, dataAnalyzer, dataVisualizer].forEach(machine => {
          machine.scale.set(1, 1, 1);
        });
        
        setShowTooltip(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Camera parallax effect on mouse movement
    const handleParallax = (event: MouseEvent) => {
      const parallaxX = (event.clientX / window.innerWidth - 0.5) * 2;
      const parallaxY = (event.clientY / window.innerHeight - 0.5) * 2;
      
      // Smoother, more subtle parallax
      const targetX = parallaxX * 2;
      const targetY = -parallaxY * 1;
      
      // Apply parallax to camera
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY + 5 - camera.position.y) * 0.05;
      
      camera.lookAt(0, 0, 0);
    };
    
    window.addEventListener('mousemove', handleParallax);
    
    // Track time for animations
    let time = 0;
    let processingVisible = false;
    let goldVisible = false;
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Move objects along the conveyor
      movingObjects.forEach(obj => {
        if (obj.delay && time < obj.delay) return;
        
        if (obj.path === 'main') {
          // Main conveyor path
          obj.mesh.position.x += obj.speed;
          
          // When entry cube reaches processor
          if (obj.mesh === entryCube && obj.mesh.position.x >= -3) {
            obj.mesh.visible = false;
            processingCube.visible = true;
            processingVisible = true;
          }
          
          // Processing animation
          if (processingVisible) {
            processingCube.rotation.y += 0.05;
            processingCube.position.y = 1 + Math.sin(time * 5) * 0.2;
            
            // After processing time
            if (!goldVisible && time > 2) {
              goldSphere.visible = true;
              goldVisible = true;
              processingCube.visible = false;
            }
          }
        }
        else if (obj.path === 'side') {
          // Side conveyor path
          if (obj.mesh.position.z > -6) {
            obj.mesh.position.z -= obj.speed;
          } else {
            obj.mesh.visible = false;
            exitCube.visible = true;
          }
        }
      });
      
      // Machine animations
      mainProcessor.children[0].rotation.y = Math.sin(time) * 0.05;
      
      // Make cubes on processor pulsate
      for (let i = 3; i < 6; i++) {
        if (mainProcessor.children[i]) {
          mainProcessor.children[i].position.y = 3.3 + Math.sin(time * 3 + i) * 0.1;
          mainProcessor.children[i].rotation.y += 0.02;
        }
      }
      
      // Rotate ring on analyzer
      if (dataAnalyzer.children[dataAnalyzer.children.length - 1]) {
        dataAnalyzer.children[dataAnalyzer.children.length - 1].rotation.z += 0.01;
      }
      
      // If visible, make exit cube rotate gently
      if (exitCube.visible) {
        exitCube.rotation.y += 0.02;
      }
      
      // Subtle movement for particles
      particlesMesh.rotation.y += 0.0005;
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleParallax);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials to prevent memory leaks
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
      scene.clear();
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="three-canvas" />
      
      {/* Tooltip that follows cursor */}
      {showTooltip && hoveredElement && (
        <div 
          className="absolute z-50 pointer-events-none bg-black bg-opacity-70 text-white py-2 px-3 rounded-md text-sm"
          style={{ 
            left: tooltipPosition.x + 15, 
            top: tooltipPosition.y - 15,
            transform: 'translateY(-100%)'
          }}
        >
          {hoveredElement}
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
