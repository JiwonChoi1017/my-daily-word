import React from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

const VocabularyDocument = () => {
  return (
    <Link href="">
      <li>
        <Canvas>
          <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </Canvas>
      </li>
    </Link>
  );
};

export default VocabularyDocument;
