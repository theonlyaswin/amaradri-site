import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Book } from "./Book";

export const Experience = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Update scale based on window size
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.6 : 1);
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Float
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={2}
        rotationIntensity={2}
      >
        <Book scale={scale} />
      </Float>
      <Environment preset="studio" />
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh 
        position-y={-1.5} 
        rotation-x={-Math.PI / 2} 
        receiveShadow
        scale={scale}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
