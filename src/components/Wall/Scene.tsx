
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useRef } from "react";
import { Selection, EffectComposer, Outline } from "@react-three/postprocessing";
import { OutlineEffect } from "postprocessing";

import CarDisplay from "../Displays/CarDisplay";
import PaintingDisplay from "../Displays/PaintingDisplay";
import Shelf from "./Shelf";

import "../../styles/Scene.css";

import HoneyveilImg from "../../assets/Thumbnail.png"

function OutlineFade({
  hovered,
  color,
}: {
  hovered: boolean;
  color: number;
}) {
  const outlineRef = useRef<OutlineEffect>(null);

  useFrame((_, delta) => {
    if (!outlineRef.current) return;

    const opacity = outlineRef.current.blendMode.opacity;
    const targetOpacity = hovered ? 1 : 0;

    opacity.value +=
      (targetOpacity - opacity.value) *
      (1 - Math.exp(-delta * 4));
  });

  return (
    <Outline
      ref={outlineRef}
      edgeStrength={2}
      visibleEdgeColor={color}
      hiddenEdgeColor={color}
      blur
    />
  );
}

function CameraScroll() {
  const { camera } = useThree();

  useFrame(() => {
    const scrollProgress =
      window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    const targetY = 1.2 - scrollProgress * 5;

    camera.position.y += (targetY - camera.position.y) * 0.08;
  });

  return null;
}

export default function Scene() {
  const [hovered, setHovered] = useState(false);
  const [carSelected, setCarSelected] = useState(false);
  const [paintingHovered, setPaintingHovered] = useState(false);
  const [paintingSelected, setPaintingSelected] = useState(false);

  return (
    <div className="scene-container">
      <Canvas
        camera={{
          position: [0, 1.2, 6],
          fov: 35,
        }}
        gl={{ alpha: true }}
      >
        <CameraScroll />
        <ambientLight intensity={0.7} />
        <directionalLight position={[-4, 6, 5]} intensity={2.5} />

        <Selection>
          <Shelf />

          <CarDisplay
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => setCarSelected((prev) => !prev)}
            carSelected={carSelected}
          />

          <group position={[-2, -2, 0]}>
            <PaintingDisplay
              hovered={paintingHovered}
              setHovered={setPaintingHovered}
              image={HoneyveilImg}
              onClick={() => setPaintingSelected((prev) => !prev)}
              paintingSelected={paintingSelected}
            />
          </group>

          <EffectComposer autoClear={false}>
            <OutlineFade
              hovered={hovered}
              color={0x8060FF}
            />
            <OutlineFade
              hovered={paintingHovered}
              color={0xFFBF00}
            />
          </EffectComposer>
        </Selection>
      </Canvas>
    </div>
  );
}
