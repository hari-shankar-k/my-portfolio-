"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const FORMATIONS = ["ORBITAL", "COGNITIVE", "NEURAL", "QUANTUM", "INTERACTIVE"];
const MORPH_INTERVAL = 30;
const MORPH_DURATION = 4;
const REPULSION_RADIUS = 1.45;

type Point3 = { x: number; y: number; z: number };
type Formation = {
  positions: Float32Array;
  motion: Uint8Array;
  motionGroup: Uint16Array;
  motionPhase: Float32Array;
};

const ORBIT_RADII = [1.9, 2.15, 2.38];
const ORBIT_TILTS = [0.2, 0.88, -0.62];
const ORBIT_PHASES = [0.18, 1.35, -0.72];
const ATOM_TILTS = [0.12, 0.88, -0.72];
const ATOM_PHASES = [0.2, 1.15, -0.8];

function random01(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function setPoint(
  formation: Formation,
  index: number,
  x: number,
  y: number,
  z: number,
  motion = 0,
  group = 0,
  phase = 0,
) {
  const offset = index * 3;
  formation.positions[offset] = x;
  formation.positions[offset + 1] = y;
  formation.positions[offset + 2] = z;
  formation.motion[index] = motion;
  formation.motionGroup[index] = group;
  formation.motionPhase[index] = phase;
}

function rotateOrbit(x: number, y: number, z: number, tilt: number, phase: number): Point3 {
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const tiltedY = y * cosTilt - z * sinTilt;
  const tiltedZ = y * sinTilt + z * cosTilt;
  const cosPhase = Math.cos(phase);
  const sinPhase = Math.sin(phase);
  return {
    x: x * cosPhase - tiltedZ * sinPhase,
    y: tiltedY,
    z: x * sinPhase + tiltedZ * cosPhase,
  };
}

function orbitalPoint(group: number, angle: number, atom = false): Point3 {
  const radius = atom ? 1.48 + group * 0.1 : ORBIT_RADII[group];
  const verticalScale = atom ? [0.7, 0.84, 0.58][group] : [0.48, 0.62, 0.4][group];
  return rotateOrbit(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius * verticalScale,
    0,
    atom ? ATOM_TILTS[group] : ORBIT_TILTS[group],
    atom ? ATOM_PHASES[group] : ORBIT_PHASES[group],
  );
}

function createNeuralGraph() {
  const nodes: Point3[] = [
    { x: -0.08, y: 0.02, z: 0.05 },
    { x: -0.2, y: 0.24, z: 0.18 },
    { x: 0.2, y: -0.14, z: -0.16 },
    { x: 0.12, y: 0.35, z: -0.28 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];
  const addBranch = (start: number, path: Point3[]) => {
    let previous = start;
    const branch: number[] = [];
    for (const point of path) {
      const current = nodes.push(point) - 1;
      edges.push([previous, current]);
      branch.push(current);
      previous = current;
    }
    return branch;
  };

  const upperLeft = addBranch(1, [
    { x: -0.48, y: 0.52, z: 0.2 },
    { x: -0.96, y: 0.72, z: 0.05 },
    { x: -1.38, y: 0.5, z: 0.35 },
    { x: -1.62, y: 0.82, z: 0.22 },
  ]);
  const upperCenter = addBranch(3, [
    { x: -0.25, y: 0.72, z: -0.55 },
    { x: 0.05, y: 1.07, z: -0.38 },
    { x: 0.52, y: 1.32, z: -0.62 },
    { x: 0.92, y: 1.12, z: -0.28 },
  ]);
  const upperRight = addBranch(1, [
    { x: 0.32, y: 0.45, z: 0.32 },
    { x: 0.76, y: 0.78, z: 0.68 },
    { x: 1.18, y: 0.55, z: 0.92 },
    { x: 1.58, y: 0.82, z: 0.67 },
  ]);
  const lowerLeft = addBranch(0, [
    { x: -0.48, y: -0.32, z: -0.36 },
    { x: -0.86, y: -0.68, z: -0.12 },
    { x: -1.28, y: -0.88, z: -0.43 },
    { x: -1.58, y: -1.18, z: -0.18 },
  ]);
  const lowerRight = addBranch(2, [
    { x: 0.42, y: -0.46, z: 0.28 },
    { x: 0.82, y: -0.68, z: 0.64 },
    { x: 1.24, y: -0.56, z: 0.36 },
    { x: 1.62, y: -0.92, z: 0.58 },
  ]);
  const deepLower = addBranch(2, [
    { x: -0.12, y: -0.6, z: -0.62 },
    { x: 0.18, y: -1, z: -0.88 },
    { x: 0.56, y: -1.34, z: -0.65 },
    { x: 0.92, y: -1.52, z: -0.96 },
  ]);
  const sideBranch = addBranch(3, [
    { x: 0.48, y: 0.18, z: -0.22 },
    { x: 0.9, y: -0.08, z: -0.42 },
    { x: 1.14, y: -0.42, z: -0.68 },
    { x: 1.54, y: -0.26, z: -0.45 },
  ]);

  edges.push(
    [upperLeft[1], upperCenter[0]],
    [upperCenter[2], upperRight[1]],
    [upperRight[0], sideBranch[0]],
    [lowerLeft[1], deepLower[0]],
    [deepLower[2], lowerRight[1]],
    [lowerRight[0], sideBranch[2]],
    [upperCenter[3], sideBranch[0]],
  );
  return { nodes, edges };
}

const NEURAL_GRAPH = createNeuralGraph();

function createFormation(index: number, count: number): Formation {
  const formation: Formation = {
    positions: new Float32Array(count * 3),
    motion: new Uint8Array(count),
    motionGroup: new Uint16Array(count),
    motionPhase: new Float32Array(count),
  };
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  if (index === 0) {
    const planetCount = Math.floor(count * 0.16);
    for (let i = 0; i < planetCount; i += 1) {
      const y = 1 - 2 * ((i + 0.5) / planetCount);
      const radius = Math.cbrt(random01(i, 11)) * 0.46;
      const angle = i * goldenAngle;
      const surface = radius * Math.sqrt(Math.max(0, 1 - y * y));
      setPoint(
        formation,
        i,
        Math.cos(angle) * surface,
        y * radius,
        Math.sin(angle) * surface,
      );
    }

    for (let i = planetCount; i < count; i += 1) {
      const ringIndex = i - planetCount;
      const group = ringIndex % 3;
      const angle = Math.floor(ringIndex / 3) * goldenAngle;
      const point = orbitalPoint(group, angle);
      setPoint(formation, i, point.x, point.y, point.z, ringIndex % 17 === 0 ? 1 : 0, group, angle);
    }
  } else if (index === 1) {
    const hemisphereCount = Math.floor(count * 0.86);
    for (let i = 0; i < hemisphereCount; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const hemisphereIndex = Math.floor(i / 2);
      const pointsPerSide = Math.ceil(hemisphereCount / 2);
      const y = 1 - 2 * ((hemisphereIndex + 0.5) / pointsPerSide);
      const crossSection = Math.sqrt(Math.max(0, 1 - y * y));
      const angle =
        ((hemisphereIndex * goldenAngle + (side > 0 ? 0.13 : 0)) % Math.PI) -
        Math.PI / 2;
      const irregularity =
        Math.sin(angle * 3 + y * 5) * 0.055 +
        Math.sin(angle * 6 - y * 8) * 0.032 +
        Math.cos(angle * 2 - y * 7) * 0.025;
      const corticalFolds =
        Math.sin(angle * 17 + y * 11 + side * 0.3) * 0.024 +
        Math.sin(angle * 29 - y * 19) * 0.015 +
        Math.sin(y * 34 + Math.sin(angle * 5) * 2.2) * 0.012;
      const lowerNarrowing = 1 - 0.1 * Math.exp(-((y + 0.68) ** 2) / 0.055);
      const cortex = (1 + irregularity + corticalFolds) * lowerNarrowing;
      const medialHalf = Math.cos(angle) * crossSection;
      setPoint(
        formation,
        i,
        side * (0.075 + medialHalf * 0.94 * cortex),
        0.04 + y * 1.08 * cortex,
        Math.sin(angle) * crossSection * 0.76 * cortex,
      );
    }

    for (let i = hemisphereCount; i < count; i += 1) {
      const t = (i - hemisphereCount) / Math.max(1, count - hemisphereCount);
      const radius = 0.075 + 0.09 * Math.sin(Math.PI * (0.16 + t * 0.76));
      const stemAngle = i * goldenAngle;
      setPoint(
        formation,
        i,
        Math.cos(stemAngle) * radius * 0.82 + Math.sin(t * Math.PI * 2) * 0.025,
        -0.98 - t * 0.7,
        Math.sin(stemAngle) * radius,
      );
    }
  } else if (index === 2) {
    const nodeParticleCount = Math.floor(count * 0.3);
    for (let i = 0; i < nodeParticleCount; i += 1) {
      const nodeIndex = i % NEURAL_GRAPH.nodes.length;
      const node = NEURAL_GRAPH.nodes[nodeIndex];
      const size = 0.05 + random01(nodeIndex, 31) * 0.1;
      const y = 1 - 2 * random01(i, 32);
      const angle = i * goldenAngle;
      const radius = Math.cbrt(random01(i, 33)) * size;
      const planar = Math.sqrt(1 - y * y);
      setPoint(
        formation,
        i,
        node.x + Math.cos(angle) * planar * radius,
        node.y + y * radius,
        node.z + Math.sin(angle) * planar * radius,
      );
    }

    for (let i = nodeParticleCount; i < count; i += 1) {
      const edgeIndex = (i - nodeParticleCount) % NEURAL_GRAPH.edges.length;
      const edge = NEURAL_GRAPH.edges[edgeIndex];
      const start = NEURAL_GRAPH.nodes[edge[0]];
      const end = NEURAL_GRAPH.nodes[edge[1]];
      const t = random01(i, 34);
      const bow = Math.sin(t * Math.PI) * 0.045;
      const zOffset = (random01(i, 35) - 0.5) * 0.04;
      setPoint(
        formation,
        i,
        start.x + (end.x - start.x) * t,
        start.y + (end.y - start.y) * t + bow,
        start.z + (end.z - start.z) * t + zOffset,
        (i - nodeParticleCount) % 29 === 0 ? 3 : 0,
        edgeIndex,
        random01(i, 36),
      );
    }
  } else if (index === 3) {
    const nucleusCount = Math.floor(count * 0.36);
    for (let i = 0; i < nucleusCount; i += 1) {
      const y = 1 - 2 * random01(i, 51);
      const angle = i * goldenAngle;
      const radius = Math.cbrt(random01(i, 52)) * 0.42;
      const planar = Math.sqrt(1 - y * y);
      setPoint(
        formation,
        i,
        Math.cos(angle) * planar * radius,
        y * radius,
        Math.sin(angle) * planar * radius,
      );
    }

    for (let i = nucleusCount; i < count; i += 1) {
      const orbitIndex = i - nucleusCount;
      const group = orbitIndex % 3;
      const angle = Math.floor(orbitIndex / 3) * goldenAngle;
      const point = orbitalPoint(group, angle, true);
      setPoint(
        formation,
        i,
        point.x,
        point.y,
        point.z,
        orbitIndex % 47 === 0 ? 2 : 0,
        group,
        angle,
      );
    }
  } else {
    const armCount = Math.floor(count * 0.76);
    for (let i = 0; i < armCount; i += 1) {
      const progress = i / armCount;
      const arm = i % 5;
      const angle = progress * Math.PI * 8 + (arm * Math.PI * 2) / 5;
      const radius = 0.24 + progress * 1.48 + (random01(i, 61) - 0.5) * 0.055;
      const z = (random01(i, 62) - 0.5) * 0.18;
      setPoint(
        formation,
        i,
        Math.cos(angle) * radius,
        (progress - 0.5) * 2.55 + Math.sin(angle * 0.5) * 0.16,
        Math.sin(angle) * radius + z,
      );
    }

    for (let i = armCount; i < count; i += 1) {
      const progress = (i - armCount) / Math.max(1, count - armCount);
      const angle = progress * Math.PI * 8;
      const radius = 0.7 + progress * 1.34;
      setPoint(
        formation,
        i,
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.22,
        Math.sin(angle) * radius,
      );
    }
  }

  return formation;
}

function createNeuralConnections() {
  const positions = new Float32Array(NEURAL_GRAPH.edges.length * 6);
  NEURAL_GRAPH.edges.forEach(([startIndex, endIndex], index) => {
    const start = NEURAL_GRAPH.nodes[startIndex];
    const end = NEURAL_GRAPH.nodes[endIndex];
    positions.set([start.x, start.y, start.z, end.x, end.y, end.z], index * 6);
  });
  return positions;
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create particle glow texture");

  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.48, "rgba(255,255,255,0.28)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function ParticleField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      host.classList.add("webgl-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 8;

    const isCompact = window.matchMedia("(max-width: 700px)").matches;
    const isLowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const count = isCompact ? 1800 : isLowPower ? 2800 : 5000;
    const initialFormation = createFormation(0, count);
    const positions = initialFormation.positions.slice();
    const basePositions = positions.slice();
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3).fill(1);
    const colorPhase = new Float32Array(count);
    const colorGlow = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      colorPhase[i] = random01(i, 81);
      colorGlow[i] = Math.pow(random01(i, 82), 1.8);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aColorPhase", new THREE.BufferAttribute(colorPhase, 1));
    geometry.setAttribute("aColorGlow", new THREE.BufferAttribute(colorGlow, 1));

    const particleTexture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      map: particleTexture,
      size: isCompact ? 0.052 : 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.94,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      alphaTest: 0.015,
    });
    const colorUniforms = {
      uTime: { value: 0 },
      uPointerPosition: { value: new THREE.Vector3() },
      uPointerStrength: { value: 0 },
    };
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, colorUniforms);
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
        attribute float aColorPhase;
        attribute float aColorGlow;
        uniform float uTime;
        uniform vec3 uPointerPosition;
        uniform float uPointerStrength;`,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <color_vertex>",
        `#include <color_vertex>
        float palettePosition = fract(uTime * 0.045 + aColorPhase) * 3.0;
        float paletteBlend = smoothstep(0.0, 1.0, fract(palettePosition));
        vec3 cyan = vec3(0.08, 0.78, 1.0);
        vec3 electricBlue = vec3(0.12, 0.3, 1.0);
        vec3 violet = vec3(0.62, 0.26, 1.0);
        vec3 particleColor = palettePosition < 1.0
          ? mix(cyan, electricBlue, paletteBlend)
          : palettePosition < 2.0
            ? mix(electricBlue, violet, paletteBlend)
            : mix(violet, cyan, paletteBlend);
        float highlightWave = 0.5 + 0.5 * sin(uTime * 0.85 + aColorPhase * 12.0);
        float highlight = smoothstep(0.97, 1.0, highlightWave) * aColorGlow;
        float cursorDistance = distance(position, uPointerPosition);
        float cursorInfluence = uPointerStrength *
          (1.0 - smoothstep(0.0, ${REPULSION_RADIUS.toFixed(2)}, cursorDistance));
        particleColor = mix(
          particleColor,
          vec3(0.72, 0.96, 1.0),
          clamp(cursorInfluence * 0.72 + highlight * 0.55, 0.0, 1.0)
        );
        vColor.rgb = particleColor *
          (0.72 + aColorGlow * 0.58 + highlight * 0.45 + cursorInfluence * 0.9);`,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        `gl_PointSize = size;
        gl_PointSize *= 1.0 + cursorInfluence * 0.45 + aColorGlow * 0.12;`,
      );
    };
    const points = new THREE.Points(geometry, material);

    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(createNeuralConnections(), 3),
    );
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: "#4b8cff",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    const system = new THREE.Group();
    system.add(points, connections);
    scene.add(system);

    const mouse = new THREE.Vector2();
    const rayNear = new THREE.Vector3();
    const rayFar = new THREE.Vector3();
    const pointerRayOrigin = new THREE.Vector3();
    const pointerRayDirection = new THREE.Vector3();
    const pointerPosition = new THREE.Vector3();
    let pointerActive = false;
    let animationFrame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let currentFormation = 0;
    let previousFormation = 0;
    let currentMotion = initialFormation;
    let nextFormationChange = MORPH_INTERVAL;
    const shapeFrom = positions.slice();
    let shapeTarget: Float32Array<ArrayBufferLike> = positions.slice();
    let shapeTransitionStart = 0;
    let pointerStrength = 0;
    let isMorphing = false;

    function resize() {
      if (!host) return;
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    function updateMouse(event: PointerEvent) {
      if (!host) return;
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointerActive = true;
    }

    function clearMouse() {
      pointerActive = false;
    }

    function handlePointerUp(event: PointerEvent) {
      if (event.pointerType !== "mouse") clearMouse();
    }

    function beginFormationChange() {
      previousFormation = currentFormation;
      currentFormation = (currentFormation + 1) % FORMATIONS.length;
      shapeFrom.set(positions);
      currentMotion = createFormation(currentFormation, count);
      shapeTarget = currentMotion.positions;
      shapeTransitionStart = elapsed;
      isMorphing = true;
    }

    function animate(time: number) {
      animationFrame = 0;
      if (document.hidden) return;

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.033)
        : 1 / 60;
      previousTime = time;
      elapsed += delta;

      while (elapsed >= nextFormationChange) {
        beginFormationChange();
        nextFormationChange += MORPH_INTERVAL;
      }

      let morphProgress = 1;
      if (isMorphing) {
        morphProgress = Math.min(1, (elapsed - shapeTransitionStart) / MORPH_DURATION);
        const easedProgress = smoothstep(morphProgress);
        for (let i = 0; i < basePositions.length; i += 1) {
          basePositions[i] = shapeFrom[i] + (shapeTarget[i] - shapeFrom[i]) * easedProgress;
        }
        if (morphProgress >= 1) isMorphing = false;
      }

      system.rotation.y = reducedMotion ? 0 : elapsed * 0.035;
      system.rotation.x = reducedMotion ? 0 : Math.sin(elapsed * 0.12) * 0.035;

      if (pointerActive) {
        system.updateMatrixWorld(true);
        rayNear.set(mouse.x, mouse.y, -1).unproject(camera);
        rayFar.set(mouse.x, mouse.y, 1).unproject(camera);
        system.worldToLocal(rayNear);
        system.worldToLocal(rayFar);
        pointerRayOrigin.copy(rayNear);
        pointerRayDirection.subVectors(rayFar, rayNear).normalize();
        const depth = Math.abs(pointerRayDirection.z) > 0.0001
          ? -pointerRayOrigin.z / pointerRayDirection.z
          : 0;
        pointerPosition.copy(pointerRayOrigin).addScaledVector(pointerRayDirection, depth);
      }
      pointerStrength +=
        ((pointerActive ? 1 : 0) - pointerStrength) * (1 - Math.exp(-7 * delta));
      colorUniforms.uTime.value = elapsed;
      colorUniforms.uPointerPosition.value.copy(pointerPosition);
      colorUniforms.uPointerStrength.value = pointerStrength;
      connectionMaterial.color.setHSL(
        0.63 + Math.sin(elapsed * 0.22) * 0.1,
        0.92,
        0.64,
      );

      const motionTime = isMorphing
        ? 0
        : Math.max(0, elapsed - shapeTransitionStart - MORPH_DURATION);
      const influenceRadiusSquared = REPULSION_RADIUS * REPULSION_RADIUS;
      const modelMotionWeight = isMorphing ? 0 : 1;

      for (let i = 0; i < count; i += 1) {
        const i3 = i * 3;
        let targetX = basePositions[i3];
        let targetY = basePositions[i3 + 1];
        let targetZ = basePositions[i3 + 2];

        if (modelMotionWeight && currentFormation === 0 && currentMotion.motion[i] === 1) {
          const group = currentMotion.motionGroup[i];
          const angle = currentMotion.motionPhase[i] + motionTime * (0.38 + group * 0.08);
          const orbit = orbitalPoint(group, angle);
          targetX = orbit.x;
          targetY = orbit.y;
          targetZ = orbit.z;
        } else if (modelMotionWeight && currentFormation === 2 && currentMotion.motion[i] === 3) {
          const edge = NEURAL_GRAPH.edges[currentMotion.motionGroup[i]];
          const start = NEURAL_GRAPH.nodes[edge[0]];
          const end = NEURAL_GRAPH.nodes[edge[1]];
          const progress = (currentMotion.motionPhase[i] + motionTime * 0.56) % 1;
          const bow = Math.sin(progress * Math.PI) * 0.045;
          targetX = start.x + (end.x - start.x) * progress;
          targetY = start.y + (end.y - start.y) * progress + bow;
          targetZ = start.z + (end.z - start.z) * progress;
        } else if (modelMotionWeight && currentFormation === 3 && currentMotion.motion[i] === 2) {
          const group = currentMotion.motionGroup[i];
          const angle = currentMotion.motionPhase[i] + motionTime * (0.62 + group * 0.1);
          const orbit = orbitalPoint(group, angle, true);
          targetX = orbit.x;
          targetY = orbit.y;
          targetZ = orbit.z;
        }

        if (!reducedMotion) {
          targetX += Math.sin(elapsed * 0.55 + i * 0.017) * 0.006;
          targetY += Math.cos(elapsed * 0.48 + i * 0.013) * 0.006;
        }

        let forceX = 0;
        let forceY = 0;
        let forceZ = 0;
        if (pointerActive) {
          const dx = positions[i3] - pointerPosition.x;
          const dy = positions[i3 + 1] - pointerPosition.y;
          const dz = positions[i3 + 2] - pointerPosition.z;
          const distanceSquared = dx * dx + dy * dy + dz * dz;

          if (distanceSquared < influenceRadiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            const influence = 1 - distance / REPULSION_RADIUS;
            const inverseDistance = 1 / Math.max(distance, 0.025);
            const noiseY = random01(i, 71) * 2 - 1;
            const noiseAngle = random01(i, 72) * Math.PI * 2;
            const noiseRadius = Math.sqrt(1 - noiseY * noiseY);
            const radialX = distance > 0.025 ? dx * inverseDistance : Math.cos(noiseAngle) * noiseRadius;
            const radialY = distance > 0.025 ? dy * inverseDistance : noiseY;
            const radialZ = distance > 0.025 ? dz * inverseDistance : Math.sin(noiseAngle) * noiseRadius;
            const tangent = (random01(i, 73) - 0.5) * 0.7;
            const strength = influence * influence * 72;
            forceX = (radialX - radialY * tangent) * strength;
            forceY = (radialY + radialX * tangent) * strength;
            forceZ = (radialZ + (random01(i, 74) - 0.5) * 0.6) * strength;
          }
        }

        for (let axis = 0; axis < 3; axis += 1) {
          const offset = i3 + axis;
          const target = axis === 0 ? targetX : axis === 1 ? targetY : targetZ;
          const force = axis === 0 ? forceX : axis === 1 ? forceY : forceZ;
          const spring = (target - positions[offset]) * 16;
          velocities[offset] = (velocities[offset] + (spring + force) * delta) * Math.exp(-6.8 * delta);
          positions[offset] += velocities[offset] * delta;
        }
      }

      const neuralWeight = isMorphing
        ? currentFormation === 2
          ? morphProgress
          : previousFormation === 2
            ? 1 - morphProgress
            : 0
        : currentFormation === 2 ? 1 : 0;
      connectionMaterial.opacity = 0.2 * smoothstep(neuralWeight);
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!document.hidden && animationFrame === 0) {
        previousTime = 0;
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function handleMotionPreference(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        startAnimation();
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    startAnimation();

    host.addEventListener("pointerdown", updateMouse);
    host.addEventListener("pointermove", updateMouse);
    host.addEventListener("pointerleave", clearMouse);
    host.addEventListener("pointerup", handlePointerUp);
    host.addEventListener("pointercancel", clearMouse);
    window.addEventListener("resize", resize);
    motionPreference.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointerdown", updateMouse);
      host.removeEventListener("pointermove", updateMouse);
      host.removeEventListener("pointerleave", clearMouse);
      host.removeEventListener("pointerup", handlePointerUp);
      host.removeEventListener("pointercancel", clearMouse);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="particle-field"
      aria-label="Interactive particle intelligence system"
      role="img"
    />
  );
}
