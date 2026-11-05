
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useMemo, useRef } from "react";
import { Object3D, SpotLight } from "three";
import { Selection, Select, EffectComposer, Outline } from "@react-three/postprocessing";
import { OutlineEffect } from "postprocessing";
import Car from "./Car";
import "../../styles/Scene.css";

function Shelf() {
  return (
    <group>
      {/* Main shelf */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.2, 0.75]} />
        <meshStandardMaterial color="#b99a72" roughness={0.65} />
      </mesh>

      {/* Front edge */}
      <mesh position={[0, -0.02, 0.39]}>
        <boxGeometry args={[3.5, 0.18, 0.08]} />
        <meshStandardMaterial color="#896744" roughness={0.55} />
      </mesh>

      {/* Left bracket: wall plate */}
      <mesh position={[-1.15, -0.22, -0.32]}>
        <boxGeometry args={[0.12, 0.55, 0.08]} />
        <meshStandardMaterial color="#896744" roughness={0.65} />
      </mesh>

      {/* Left bracket: diagonal support */}
      <mesh
        position={[-1.15, -0.12, -0.12]}
        rotation={[Math.PI / 4, 0, 0]}
      >
        <boxGeometry args={[0.09, 0.55, 0.09]} />
        <meshStandardMaterial color="#896744" roughness={0.65} />
      </mesh>

      {/* Right bracket: wall plate */}
      <mesh position={[1.15, -0.22, -0.32]}>
        <boxGeometry args={[0.12, 0.55, 0.08]} />
        <meshStandardMaterial color="#896744" roughness={0.65} />
      </mesh>

      {/* Right bracket: diagonal support */}
      <mesh
        position={[1.15, -0.12, -0.12]}
        rotation={[Math.PI / 4, 0, 0]}
      >
        <boxGeometry args={[0.09, 0.55, 0.09]} />
        <meshStandardMaterial color="#896744" roughness={0.65} />
      </mesh>
    </group>
  );
}


function CarDisplay({
    hovered,
    setHovered,
  }: {
    hovered: boolean;
    setHovered: (value: boolean) => void;
  }) {
  const lightRef = useRef<SpotLight>(null);

  const target = useMemo(() => {
    const object = new Object3D();
    object.position.set(0, 0.1, 0);
    return object;
  }, []);

  useFrame((_, delta) => {
    // Experiment with different target intensities since we are using just 1 light now
    const targetIntensity = hovered ? 36 : 0;
    const fadeSpeed = 4;

    if (!lightRef.current) return;

    lightRef.current.intensity +=
      (targetIntensity - lightRef.current.intensity) *
      (1 - Math.exp(-delta * fadeSpeed));
  });

  return (
    <group
      position={[0.2, 0.087, -0.2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={target} />

      <Select enabled>
        <group rotation={[0, Math.PI / 2, 0]}>
          <Suspense fallback={null}>
            <Car />
          </Suspense>
        </group>
      </Select>

      {/* Experiment with different light colors */}
      <spotLight
        ref={lightRef}
        position={[0, 1.5, 2]}
        target={target}
        intensity={0}
        distance={0}
        angle={1.3}
        penumbra={1}
        decay={2}
        color="#8060FF"
      />
    </group>
  );
}

function OutlineFade({ hovered }: { hovered: boolean }) {
  const outlineRef = useRef<OutlineEffect>(null);

  useFrame((_, delta) => {
    if (!outlineRef.current) return;

    const opacity = outlineRef.current.blendMode.opacity;

    // Maybe experiment with targetOpacity? 2 seems like a happy medium tho
    const targetOpacity = hovered ? 2 : 0;
    const fadeSpeed = 4;

    opacity.value +=
      (targetOpacity - opacity.value) *
      (1 - Math.exp(-delta * fadeSpeed));
  });

  // Experiment with different outline colors
  return (
    <Outline
      ref={outlineRef}
      edgeStrength={2}
      visibleEdgeColor={0x9b7bff}
      hiddenEdgeColor={0x9b7bff}
      blur
    />
  );
}

export default function Scene() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="scene-container">
      <Canvas
        camera={{
          position: [0, 1.2, 6],
          fov: 45,
        }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[-4, 6, 5]} intensity={2.5} />

        <Selection>
          <group position={[0, 0, 0]}>
            <Shelf />

            <group
              position={[0, 0, -0.1]}
              rotation={[0, 0, 0]}
            >
              <Suspense fallback={null}>
                <CarDisplay hovered={hovered} setHovered={setHovered}/>
              </Suspense>
            </group>
          </group>

          <EffectComposer autoClear={false}>
            <OutlineFade hovered={hovered} />
          </EffectComposer>
        </Selection>
      </Canvas>
    </div>
  );
}
