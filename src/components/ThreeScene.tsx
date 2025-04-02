
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
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
    camera.position.z = 15;
    camera.position.y = 2;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x007BFF, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x6A11CB, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Processing hub (central cube)
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2575FC,
      transparent: true,
      opacity: 0.7,
      wireframe: false,
      emissive: 0x6A11CB,
      emissiveIntensity: 0.3,
    });
    const processingHub = new THREE.Mesh(cubeGeometry, cubeMaterial);
    processingHub.position.set(0, 0, 0);
    scene.add(processingHub);
    
    // Document mesh (starting point)
    const documentGeometry = new THREE.BoxGeometry(2.5, 3.5, 0.2);
    const documentMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const document = new THREE.Mesh(documentGeometry, documentMaterial);
    document.position.set(-8, 0, 0);
    scene.add(document);
    
    // Create version paths
    const versionPaths = [
      { name: "PDF v1.0", position: { x: 8, y: 3, z: 0 }, color: 0xFF5733 },
      { name: "DOCX 2007", position: { x: 8, y: 0, z: 0 }, color: 0x33FF57 },
      { name: "Markdown v2.1", position: { x: 8, y: -3, z: 0 }, color: 0x3357FF }
    ];
    
    // Path curves and visualizations
    const paths: THREE.CatmullRomCurve3[] = [];
    const curveObjects: THREE.Line[] = [];
    const transformedDocs: THREE.Mesh[] = [];
    const movingPoints: { mesh: THREE.Mesh, curve: THREE.CatmullRomCurve3, progress: number }[] = [];
    
    versionPaths.forEach((pathInfo, index) => {
      // Create Catmull-Rom spline curve for smooth path
      const curvePoints = [
        new THREE.Vector3(-8, 0, 0), // Start at document
        new THREE.Vector3(-4, index - 1, 0), // Control point
        new THREE.Vector3(0, 0, 0), // Through processing hub
        new THREE.Vector3(4, (index - 1) * 1.5, 0), // Control point
        new THREE.Vector3(pathInfo.position.x, pathInfo.position.y, pathInfo.position.z), // End point
      ];
      
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      paths.push(curve);
      
      // Visualize the path
      const points = curve.getPoints(50);
      const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const pathMaterial = new THREE.LineBasicMaterial({ 
        color: pathInfo.color,
        transparent: true,
        opacity: 0.6,
        linewidth: 2,
      });
      
      const curveObject = new THREE.Line(pathGeometry, pathMaterial);
      curveObjects.push(curveObject);
      scene.add(curveObject);
      
      // Create glowing particles that move along the path
      const glowGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: pathInfo.color,
        transparent: true,
        opacity: 0.8,
      });
      
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);
      
      movingPoints.push({
        mesh: glow,
        curve: curve,
        progress: Math.random() // Random starting point
      });
      
      // Create transformed document at endpoint
      const transformedDocGeometry = new THREE.BoxGeometry(2, 3, 0.2);
      const transformedDocMaterial = new THREE.MeshPhongMaterial({
        color: pathInfo.color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        emissive: pathInfo.color,
        emissiveIntensity: 0.3,
      });
      
      const transformedDoc = new THREE.Mesh(transformedDocGeometry, transformedDocMaterial);
      transformedDoc.position.copy(new THREE.Vector3(pathInfo.position.x, pathInfo.position.y, pathInfo.position.z));
      transformedDoc.userData = { name: pathInfo.name }; // Store name for hover interaction
      transformedDocs.push(transformedDoc);
      scene.add(transformedDoc);
    });
    
    // Particles for visual effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x007BFF,
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
      
      // Check for intersections with transformed documents
      const intersects = raycaster.intersectObjects(transformedDocs);
      
      if (intersects.length > 0) {
        const hoveredObject = intersects[0].object as THREE.Mesh;
        const docName = hoveredObject.userData.name;
        
        // Set state for tooltip
        setHoveredPath(docName);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
        setShowTooltip(true);
        
        // Highlight the hovered document
        hoveredObject.scale.set(1.1, 1.1, 1.1);
        
        // Highlight its path
        const index = versionPaths.findIndex(path => path.name === docName);
        if (index !== -1 && curveObjects[index]) {
          const material = curveObjects[index].material as THREE.LineBasicMaterial;
          material.opacity = 1;
          material.color.set(0xFFFFFF);
        }
      } else {
        // Reset all documents and paths
        transformedDocs.forEach((doc, index) => {
          doc.scale.set(1, 1, 1);
          
          if (curveObjects[index]) {
            const material = curveObjects[index].material as THREE.LineBasicMaterial;
            material.opacity = 0.6;
            material.color.set(versionPaths[index].color);
          }
        });
        
        setShowTooltip(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Camera parallax effect on mouse movement
    const handleParallax = (event: MouseEvent) => {
      const parallaxX = (event.clientX / window.innerWidth - 0.5) * 2;
      const parallaxY = (event.clientY / window.innerHeight - 0.5) * 2;
      
      camera.position.x = parallaxX * 0.5;
      camera.position.y = -parallaxY * 0.5 + 2;
    };
    
    window.addEventListener('mousemove', handleParallax);
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the processing hub
      processingHub.rotation.x += 0.005;
      processingHub.rotation.y += 0.01;
      
      // Pulse glow effect for the hub
      processingHub.material.opacity = 0.5 + Math.sin(Date.now() * 0.001) * 0.2;
      
      // Floating animation for document
      document.position.y = Math.sin(Date.now() * 0.001) * 0.5;
      document.rotation.y = Math.sin(Date.now() * 0.0005) * 0.3;
      
      // Floating animation for transformed documents
      transformedDocs.forEach((doc, index) => {
        doc.position.y = versionPaths[index].position.y + Math.sin(Date.now() * 0.001 + index) * 0.3;
        doc.rotation.y = Math.sin(Date.now() * 0.0005 + index) * 0.3;
      });
      
      // Move the glowing particles along the paths
      movingPoints.forEach((point, index) => {
        point.progress += 0.002;
        
        // Reset when reaching end
        if (point.progress >= 1) {
          point.progress = 0;
        }
        
        // Position on curve
        const position = point.curve.getPointAt(point.progress);
        point.mesh.position.copy(position);
        
        // Pulse effect
        point.mesh.scale.setScalar(0.7 + Math.sin(Date.now() * 0.003) * 0.3);
      });
      
      // Subtle movement for particles
      particlesMesh.rotation.y += 0.0005;
      
      // Update camera controls and render
      camera.lookAt(scene.position);
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
      
      // Dispose geometries and materials
      [documentGeometry, cubeGeometry, particlesGeometry, ...transformedDocs.map(doc => doc.geometry)]
        .forEach(geometry => geometry.dispose());
        
      [documentMaterial, cubeMaterial, particlesMaterial, 
        ...transformedDocs.map(doc => doc.material as THREE.Material)]
        .forEach(material => material.dispose());
      
      renderer.dispose();
      scene.clear();
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="three-canvas" />
      
      {/* Tooltip that follows cursor */}
      {showTooltip && hoveredPath && (
        <div 
          className="absolute z-50 pointer-events-none bg-black bg-opacity-70 text-white py-2 px-3 rounded-md text-sm"
          style={{ 
            left: tooltipPosition.x + 15, 
            top: tooltipPosition.y - 15,
            transform: 'translateY(-100%)'
          }}
        >
          {hoveredPath}
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
