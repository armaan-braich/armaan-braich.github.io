import { useTexture } from "@react-three/drei";

interface PaintingProps {
    image: string;
    width?: number;
    frameColor?: string;
    aspectRatio?: number;
}

export default function Painting({
    image,
    width = 1.8,
    frameColor = "#896744",
    aspectRatio = 1.5,
}: PaintingProps) {
    const texture = useTexture(image);

    const height = width / aspectRatio;

    const frameBorder = 0.06;
    const frameDepth = 0.08;

    return (
        <group>
            {/*Picture Frame */}
            <mesh position={[0,0, -frameDepth / 2]}>
                <boxGeometry
                    args={[
                        width + frameBorder * 2,
                        height + frameBorder * 2,
                        frameDepth,
                    ]}
                />
                <meshStandardMaterial
                    color={frameColor}
                    roughness={0.65}
                />
            </mesh>

            {/* image */}
            <mesh position={[0, 0, 0.005]}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
        </group>
    );
}