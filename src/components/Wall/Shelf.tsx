interface ShelfProps {
  width?: number;
  depth?: number;
  thickness?: number;
  color?: string;
  showBrackets?: boolean;
}

export default function Shelf({
  width = 3.5,
  depth = 0.75,
  thickness = 0.2,
  color = "#b99a72",
  showBrackets = true,
}: ShelfProps) {
  const bracketOffset = width * 0.33;

  return (
    <group>
      {/* Main shelf */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color={color} roughness={0.65} />
      </mesh>

      {/* Front edge */}
      <mesh position={[0, -thickness * 0.1, depth / 2 + 0.04]}>
        <boxGeometry args={[width, thickness * 0.9, 0.08]} />
        <meshStandardMaterial color="#896744" roughness={0.55} />
      </mesh>

      {/* Brackets */}
      {showBrackets && (
        <>
          {/* Left bracket */}
          <group position={[-bracketOffset, 0, 0]}>
            {/* Wall plate */}
            <mesh position={[0, -thickness * 1.1, -depth * 0.43]}>
              <boxGeometry args={[0.12, thickness * 2.75, 0.08]} />
              <meshStandardMaterial color="#896744" roughness={0.65} />
            </mesh>

            {/* Diagonal support */}
            <mesh
              position={[0, -thickness * 0.6, -depth * 0.16]}
              rotation={[Math.PI / 4, 0, 0]}
            >
              <boxGeometry args={[0.09, thickness * 2.75, 0.09]} />
              <meshStandardMaterial color="#896744" roughness={0.65} />
            </mesh>
          </group>

          {/* Right bracket */}
          <group position={[bracketOffset, 0, 0]}>
            {/* Wall plate */}
            <mesh position={[0, -thickness * 1.1, -depth * 0.43]}>
              <boxGeometry args={[0.12, thickness * 2.75, 0.08]} />
              <meshStandardMaterial color="#896744" roughness={0.65} />
            </mesh>

            {/* Diagonal support */}
            <mesh
              position={[0, -thickness * 0.6, -depth * 0.16]}
              rotation={[Math.PI / 4, 0, 0]}
            >
              <boxGeometry args={[0.09, thickness * 2.75, 0.09]} />
              <meshStandardMaterial color="#896744" roughness={0.65} />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
}
