// components/TheEntity.jsx
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { hexColorsToNumberArray } from "@/lib/helpers";

const BASE_PARTICLE_CONFIG = {
  count: 9999,
  size: 0.25,
  basePulseIntensity: 0.05,
  responsePulseIntensity: 0.2,
  pulseSpeed: 1.2,
  responsePulseSpeed: 5,
  rotationSpeed: 0.15,
  colors: [0xffffff, 0xff0000, 0x0000ff, 0xffff00],
  coreColor: 0x8b5cf6,
};

export default function TheEntity({
  isResponding = false,
  galaxy = "DEFAULT",
  galaxycolors = [],
  coreColorHex = "#8b5cf6",
}) {
  const groupRef = useRef();
  const particlesRef = useRef();
  const coreRef = useRef();
  const originalPositions = useRef();
  const pulsePhase = useRef(0);

  const pulseIntensityRef = useRef(BASE_PARTICLE_CONFIG.basePulseIntensity);
  const pulseSpeedRef = useRef(BASE_PARTICLE_CONFIG.pulseSpeed);

  const [particleConfig, setParticleConfig] = useState(BASE_PARTICLE_CONFIG);

  useEffect(() => {
    const config = { ...BASE_PARTICLE_CONFIG };

    const parsedCoreColor = coreColorHex
      ? parseInt(coreColorHex.replace(/^#/, ""), 16)
      : BASE_PARTICLE_CONFIG.coreColor;

    switch (galaxy.toUpperCase()) {
      case "PX-64":
      case "NEBULA":
      case "ANDROMEDA":
      case "MILKY WAY":
      case "EYE OF GOD":
      case "CENTAURUS":
        config.colors = hexColorsToNumberArray(galaxycolors);
        config.coreColor = parsedCoreColor;
        if (galaxy.toUpperCase() === "PX-64") {
          config.responsePulseSpeed = 10;
          config.responsePulseIntensity = 0.3;
          config.basePulseIntensity = 0.02;
          config.rotationSpeed = 0.3;
        } else if (galaxy.toUpperCase() === "NEBULA") {
          config.responsePulseIntensity = 0.1;
          config.responsePulseSpeed = 2;
          config.rotationSpeed = 0.12;
        } else if (galaxy.toUpperCase() === "ANDROMEDA") {
          config.responsePulseIntensity = 0.15;
          config.responsePulseSpeed = 4;
          config.rotationSpeed = 0.18;
        } else if (galaxy.toUpperCase() === "MILKY WAY") {
          config.responsePulseIntensity = 0.1;
          config.responsePulseSpeed = 3;
          config.rotationSpeed = 0.1;
        } else if (galaxy.toUpperCase() === "EYE OF GOD") {
          config.responsePulseIntensity = 0.25;
          config.responsePulseSpeed = 6;
          config.rotationSpeed = 0.2;
        } else if (galaxy.toUpperCase() === "CENTAURUS") {
          config.responsePulseIntensity = 0.18;
          config.responsePulseSpeed = 3.5;
          config.rotationSpeed = 0.14;
        }
        break;

      default:
        config.coreColor = parsedCoreColor;
        break;
    }

    setParticleConfig(config);
  }, [galaxy, galaxycolors, coreColorHex]);

  useEffect(() => {
    if (!groupRef.current) return;


    if (particlesRef.current) {
      groupRef.current.remove(particlesRef.current);
      particlesRef.current.geometry.dispose();
      particlesRef.current.material.dispose();
      particlesRef.current = null;
    }

    if (coreRef.current) {
      groupRef.current.remove(coreRef.current);
      coreRef.current.geometry.dispose();
      coreRef.current.material.dispose();
      coreRef.current = null;
    }

    const particles = [];
    const colors = [];
    const { count, colors: colorPalette, size } = particleConfig;

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particles.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      const color = new THREE.Color(
        colorPalette[Math.floor(Math.random() * colorPalette.length)]
      );
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particles, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    originalPositions.current = [...particles];

    particlesRef.current = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        alphaTest: 0.01,
        depthWrite: false,
        sizeAttenuation: true,
        onBeforeCompile: (shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
            `gl_FragColor = vec4( outgoingLight, diffuseColor.a );
             float distance = length(gl_PointCoord - vec2(0.5));
             float alpha = 1.0 - smoothstep(0.45, 0.5, distance);
             gl_FragColor.a *= alpha;`
          );
        },
      })
    );

    groupRef.current.add(particlesRef.current);

    // Create core mesh with dynamic coreColor from config
    const coreGeometry = new THREE.SphereGeometry(4, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: particleConfig.coreColor,
      transparent: true,
      opacity: isResponding ? 1 : 0.5,
      blending: THREE.AdditiveBlending,
    });
    coreRef.current = new THREE.Mesh(coreGeometry, coreMaterial);
    groupRef.current.add(coreRef.current);

    return () => {
      // cleanup on unmount
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        particlesRef.current.material.dispose();
      }
      if (coreRef.current) {
        coreRef.current.geometry.dispose();
        coreRef.current.material.dispose();
      }
    };
  }, [particleConfig, isResponding]);

  useFrame(({ clock }) => {
    if (!particlesRef.current || !originalPositions.current) return;
    if (!coreRef.current) return;

    const time = clock.getElapsedTime();

    // Smoothly interpolate pulse intensity and speed
    const targetPulseIntensity = isResponding
      ? particleConfig.responsePulseIntensity
      : particleConfig.basePulseIntensity;
    pulseIntensityRef.current = THREE.MathUtils.lerp(
      pulseIntensityRef.current,
      targetPulseIntensity,
      0.05
    );

    const targetPulseSpeed = isResponding
      ? particleConfig.responsePulseSpeed
      : particleConfig.pulseSpeed;
    pulseSpeedRef.current = THREE.MathUtils.lerp(
      pulseSpeedRef.current,
      targetPulseSpeed,
      0.05
    );

    // Rotate whole particle group
    particlesRef.current.rotation.y = time * particleConfig.rotationSpeed;
    coreRef.current.rotation.y = time * particleConfig.rotationSpeed * 1.5;

    // Animate core opacity smoothly based on response state
    coreRef.current.material.opacity = THREE.MathUtils.lerp(
      coreRef.current.material.opacity,
      isResponding ? 1 : 0.4,
      0.1
    );

    // Pulse animation for particles
    const positions = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const baseIndex = i;
      let distanceFactor =
        0.5 +
        0.5 *
          Math.sin(
            time * pulseSpeedRef.current +
              originalPositions.current[baseIndex] * 0.2 +
              originalPositions.current[baseIndex + 2] * 0.2
          );

      if (isResponding) {
        const responsivePulse = Math.sin(time * 8 + i * 0.001) * 0.1;
        distanceFactor += responsivePulse;
      }

      positions[i] =
        originalPositions.current[baseIndex] *
        (1 + distanceFactor * pulseIntensityRef.current);
      positions[i + 1] =
        originalPositions.current[baseIndex + 1] *
        (1 + distanceFactor * pulseIntensityRef.current);
      positions[i + 2] =
        originalPositions.current[baseIndex + 2] *
        (1 + distanceFactor * pulseIntensityRef.current);
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <group ref={groupRef} />;
}
