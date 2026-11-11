import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, SpotLight } from "three";
import { Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";

import Car from "../Wall/Car";

interface CarDisplayProps {
  hovered: boolean;
  setHovered: (value: boolean) => void;
  onClick: () => void;
  carSelected: boolean;
}

export default function CarDisplay({
    hovered,
    setHovered,
    onClick,
    carSelected,
  }: CarDisplayProps) {
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