
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import "../../styles/Scene.css";

function TestObject() {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.5;
      cubeRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#987854" roughness={0.5} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="scene-container">
      <Canvas
        camera={{
          position: [3, 2, 5],
          fov: 45,
        }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[3, 5, 5]}
          intensity={2}
        />

        <TestObject />
      </Canvas>
    </div>
  );
}
