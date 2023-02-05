import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { BookContext } from "@/book/BookProvider";
import { useRouter } from "next/router";

const VocabularyBook: React.FC<{
  id: string;
  title: string;
  description: string;
}> = ({ id, title, description }) => {
  const router = useRouter();
  const { setBook } = useContext(BookContext);

  const clickBookHandler = () => {
    setBook({ id, title });
    router.push(`/vocabulary/book/${title}`);
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
