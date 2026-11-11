import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, SpotLight } from "three";
import { Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";

import Painting from "../Wall/Painting";

interface PaintingDisplayProps {
  hovered: boolean;
  setHovered: (value: boolean) => void;
  image: string;
  onClick: () => void;
  paintingSelected: boolean;
};

export default function PaintingDisplay({
  hovered,
  setHovered,
  image,
  onClick,
  paintingSelected,
}: PaintingDisplayProps) {
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