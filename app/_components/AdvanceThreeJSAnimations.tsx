"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function AdvancedScrollAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Main geometry - Crystal/Orb
    const geometry = new THREE.IcosahedronGeometry(10, 1);
    
    // Custom shader material with glow
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform float uMorphProgress;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        
        vec3 newPosition = position;
        float displacement = sin(position.x * 0.5 + uTime) * 
                           cos(position.y * 0.5 + uTime) * 
                           uMorphProgress * 2.0;
        newPosition += normal * displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uGlowIntensity;
      
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
        
        vec3 color = mix(uColor1, uColor2, sin(uTime * 0.5) * 0.5 + 0.5);
        float glow = fresnel * uGlowIntensity;
        
        gl_FragColor = vec4(color + glow, 0.8 + fresnel * 0.2);
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0 },
        uColor1: { value: new THREE.Color(0x4a90e2) },
        uColor2: { value: new THREE.Color(0x9b59b6) },
        uGlowIntensity: { value: 1.5 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    const mainMesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mainMesh);

    // Particle system
    const particleCount = 2000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4a90e2, 2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9b59b6, 2, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Scroll handler
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);

      const section = Math.floor(progress * 4);
      setCurrentSection(section);

      // Scene transitions based on scroll
      if (progress < 0.25) {
        // Scene 1: Hero intro
        camera.position.z = 50 - progress * 100;
        mainMesh.scale.setScalar(1 + progress * 2);
        shaderMaterial.uniforms.uMorphProgress.value = 0;
        particleMaterial.opacity = 0;
        mainMesh.visible = true;
      } else if (progress < 0.5) {
        // Scene 2: Breakdown
        const localProgress = (progress - 0.25) * 4;
        camera.position.z = 25;
        camera.position.x = Math.sin(localProgress * Math.PI) * 15;
        camera.position.y = Math.cos(localProgress * Math.PI) * 10;
        camera.lookAt(0, 0, 0);
        
        shaderMaterial.uniforms.uMorphProgress.value = localProgress;
        mainMesh.rotation.y = localProgress * Math.PI * 2;
      } else if (progress < 0.75) {
        // Scene 3: Particle transformation
        const localProgress = (progress - 0.5) * 4;
        mainMesh.visible = localProgress < 0.5;
        particleMaterial.opacity = Math.min(localProgress * 2, 1);
        
        camera.position.z = 25 + localProgress * 25;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.lookAt(0, 0, 0);

        // Particle animation
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const angle = (i / particleCount) * Math.PI * 2 + localProgress * Math.PI * 2;
          const radius = 15 + Math.sin(angle * 5 + localProgress * 10) * 5;
          
          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = Math.sin(angle) * radius;
          positions[i3 + 2] = Math.sin(angle * 3 + localProgress * 5) * 10;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      } else {
        // Scene 4: CTA finale
        const localProgress = (progress - 0.75) * 4;
        mainMesh.visible = false;
        
        camera.position.z = 50;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.lookAt(0, 0, 0);

        // Collapse particles to line
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const t = i / particleCount;
          
          positions[i3] = (t - 0.5) * 40 * (1 - localProgress);
          positions[i3 + 1] = Math.sin(t * Math.PI * 4) * 5 * (1 - localProgress);
          positions[i3 + 2] = 0;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleMaterial.opacity = 1 - localProgress * 0.5;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      shaderMaterial.uniforms.uTime.value = time;

      // Smooth mouse follow
      mainMesh.rotation.x += (targetRotationX - mainMesh.rotation.x) * 0.05;
      mainMesh.rotation.y += (targetRotationY - mainMesh.rotation.y) * 0.05;

      // Particle rotation
      particleSystem.rotation.y += 0.001;

      // Light animation
      pointLight1.position.x = Math.sin(time) * 30;
      pointLight1.position.z = Math.cos(time) * 30;
      pointLight2.position.x = Math.cos(time * 0.7) * 30;
      pointLight2.position.z = Math.sin(time * 0.7) * 30;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  const sections = [
    {
      title: "Revolutionary Design",
      description: "Experience the next generation of digital communication with cutting-edge technology."
    },
    {
      title: "Seamless Integration",
      description: "Built with Next.js, Express, and MongoDB for lightning-fast performance."
    },
    {
      title: "Real-time Connection",
      description: "Socket.io powers instant messaging across all devices simultaneously."
    },
    {
      title: "Get Started Today",
      description: "Join thousands of users in the future of communication."
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Fixed canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      {/* Scroll content */}
      <div className="relative z-10">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div 
              className={`max-w-4xl text-center transition-all duration-1000 ${
                currentSection === index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                {section.description}
              </p>
              
              {index === 3 && (
                <button className="mt-12 px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                  Launch App
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="w-2 h-32 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Section indicators */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 space-y-4">
        {sections.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-blue-500 scale-150' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}