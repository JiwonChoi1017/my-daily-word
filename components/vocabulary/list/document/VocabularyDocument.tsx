import React from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

const VocabularyDocument: React.FC<{
  id: string;
  title: string;
  description: string;
}> = ({ id, title, description }) => {
  return (
    <Link href={`/vocabulary/list/${title}`}>
      <li id={id}>
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </Canvas>
        <p>{title}</p>
        <p>{description}</p>
      </li>
    </Link>
  );
};

export default VocabularyDocument;
