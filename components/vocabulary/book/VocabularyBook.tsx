import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/router";

const VocabularyBook: React.FC<{
  id: string;
  title: string;
  description: string;
}> = ({ id, title, description }) => {
  const router = useRouter();

  const clickBookHandler = () => {
    router.push(`/vocabulary/list/${id}`);
  };

  return (
    <li id={id} style={{ cursor: "pointer" }} onClick={clickBookHandler}>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
      <p>{title}</p>
      <p>{description}</p>
    </li>
  );
};

export default VocabularyBook;
