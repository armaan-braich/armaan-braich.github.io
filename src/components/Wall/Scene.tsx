
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useMemo, useRef } from "react";
import { Object3D, SpotLight } from "three";
import { Selection, Select, EffectComposer, Outline } from "@react-three/postprocessing";
import { OutlineEffect } from "postprocessing";
import { Html } from "@react-three/drei";

import Car from "./Car";
import Shelf from "./Shelf";
import Painting from "./Painting"

import "../../styles/Scene.css";

import HoneyveilImg from "../../assets/Thumbnail.png"

function CarDisplay({
    hovered,
    setHovered,
    onClick,
    carSelected,
  }: {
    hovered: boolean;
    setHovered: (value: boolean) => void;
    onClick: () => void;
    carSelected: boolean;
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
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <primitive object={target} />

      <Select enabled={hovered}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <Suspense fallback={null}>
            <Car />
          </Suspense>
        </group>
      </Select>
      {carSelected && (
        <Html
          position={[1.5, 0.8, 0]}
          transform={false}
          distanceFactor={undefined}
          style={{
            width: "350px",
            pointerEvents: "auto",
          }}
        >
          <div className="project-panel" id="car-panel">
            <button onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}>
              ×
            </button>

            <p className="project-category">ROBOTICS / AUTONOMY</p>
            <h2>F1TENTH Autonomous Vehicle</h2>

            <p>
              Developed an autonomous vehicle using ROS 2 Foxy,
              implementing obstacle avoidance for the F1TENTH platform.
            </p>

            <h3>Technologies</h3>
            <p>ROS 2 · C++ · Python · Linux</p>

            <h3>Project details</h3>
            <p>
              This project mostly focused on using LiDAR to allow an autonomous
              vehicle to quickly navigate an enclosed course while avoiding
              collisions with obstacles, whether static obstacles or other cars.
              This involved developing emergency braking features, PID control
              for steering, and fine-tuning turning angle and speed parameters.
              Additionally, my team used a custom-trained AI model to recognize
              street signs and react accordingly. We finished first place in a
              racing tournament against nine other F1TENTH cars.
            </p>
          </div>
        </Html>
      )}

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


function PaintingDisplay({
  hovered,
  setHovered,
  image,
  onClick,
  paintingSelected,
}: {
  hovered: boolean;
  setHovered: (value: boolean) => void;
  image: string;
  onClick: () => void;
  paintingSelected: boolean;
}) {
  const lightRef = useRef<SpotLight>(null);

  const target = useMemo(() => {
    const object = new Object3D();
    object.position.set(0, 0, 0.02);
    return object;
  }, []);

  useFrame((_, delta) => {
    const targetIntensity = hovered ? 20 : 0;
    const fadeSpeed = 4;

    if (!lightRef.current) return;

    lightRef.current.intensity +=
      (targetIntensity - lightRef.current.intensity) *
      (1 - Math.exp(-delta * fadeSpeed));
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <primitive object={target} />

      <Select enabled={hovered}>
        <Suspense fallback={null}>
          <Painting
            image={image}
            width={1.8}
            aspectRatio={3 / 2}
          />
        </Suspense>
      </Select>
      {paintingSelected && (
        <Html
          position={[1.2, 1, 0]}
          transform={false}
          distanceFactor={undefined}
          style={{
            width: "350px",
            pointerEvents: "auto",
          }}
        >
          <div className="project-panel" id="painting-panel">
            <button onClick={(event) => {
              event.stopPropagation();
              onClick();
            }}>
              ×
            </button>

            <p className="project-category">EDGE AI / GAME DEVELOPMENT</p>
            <h2>AI Fantasy Game World</h2>

            <p>
              Developed an interactive fantasy game world featuring AI-powered
              NPCs capable of personalized conversations and dynamic interactions,
              using locally deployed language models.
            </p>

            <h3>Technologies</h3>
            <p>React · TypeScript · Redux · WebLLM · AWS EC2</p>

            <h3>Project details</h3>
            <p>
              Developed as part of my UBC Computer Engineering capstone project,
              this system explored the use of smaller language models deployed
              directly on edge devices to power interactive NPCs. The goal was
              to make AI-driven interactions more accessible without relying
              entirely on remote model inference.
            </p>

            <p>
              My primary contributions focused on frontend development and
              integrating the AI interaction pipeline. I implemented frontend
              logic and state management using React and Redux, connecting
              user interactions with NPC responses through the application's
              communication pipeline. I also worked on structuring prompts
              to give NPCs distinct personalities and enable more context-aware
              conversations.
            </p>

            <p>
              The project also involved exploring the limitations of running
              smaller language models locally, particularly response speed
              and hallucinations, and how these affected the overall user
              experience.
            </p>
          </div>
        </Html>
      )}

      <spotLight
        ref={lightRef}
        position={[0, 1.2, 2]}
        target={target}
        intensity={0}
        distance={0}
        angle={0.9}
        penumbra={1}
        decay={2}
        color="#FFBF00"
      />
    </group>
  );
}


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
