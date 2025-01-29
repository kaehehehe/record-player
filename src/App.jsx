import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./styles.css";

export default function App() {
  const { scene } = useGLTF("record-player.glb");
  const audioRef = useRef(new Audio("music.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => {
        console.error("Music playback error:", error);
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  return (
    <Canvas camera={{ fov: 40, position: [0, 2, 5], near: 1, far: 100 }}>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      <mesh
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 5, 0]}
        onClick={handlePlayMusic}
      >
        <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
      </mesh>

      <OrbitControls minDistance={2} maxDistance={10} />
    </Canvas>
  );
}
