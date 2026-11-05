import { useGLTF } from "@react-three/drei";

export default function Car() {
  const { scene } = useGLTF("/models/car.glb");

  return (
    <primitive object={scene.clone()} scale={0.005} />
  );
}

useGLTF.preload("/models/car.glb");