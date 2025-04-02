
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x007BFF, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x6A11CB, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Document mesh (starting point)
    const documentGeometry = new THREE.BoxGeometry(3, 4, 0.2);
    const documentMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const document = new THREE.Mesh(documentGeometry, documentMaterial);
    document.position.x = -6;
    document.position.y = 0;
    scene.add(document);
    
    // Processing cube (middle transformation)
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2575FC,
      transparent: true,
      opacity: 0.7,
      wireframe: false,
      emissive: 0x6A11CB,
      emissiveIntensity: 0.3,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 0;
    cube.position.y = 0;
    scene.add(cube);
    
    // Transformed document (endpoint)
    const transformedDocGeometry = new THREE.BoxGeometry(3, 4, 0.2);
    const transformedDocMaterial = new THREE.MeshPhongMaterial({
      color: 0x007BFF,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      emissive: 0x007BFF,
      emissiveIntensity: 0.3,
    });
    const transformedDoc = new THREE.Mesh(transformedDocGeometry, transformedDocMaterial);
    transformedDoc.position.x = 6;
    transformedDoc.position.y = 0;
    scene.add(transformedDoc);
    
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
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the processing cube
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.01;
      
      // Floating animation for documents
      document.position.y = Math.sin(Date.now() * 0.001) * 0.5;
      transformedDoc.position.y = Math.sin(Date.now() * 0.001 + 1) * 0.5;
      
      // Rotate documents slightly
      document.rotation.y = Math.sin(Date.now() * 0.0005) * 0.5;
      transformedDoc.rotation.y = Math.sin(Date.now() * 0.0005 + 1) * 0.5;
      
      // Particles subtle movement
      particlesMesh.rotation.y += 0.0005;
      
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
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);
  
  return (
    <div ref={containerRef} className="three-canvas" />
  );
};

export default ThreeScene;
