import React from "react";
import { useRouter } from "next/router";

// TODO: 修正・削除機能も実装
const VocabularyBook: React.FC<{
  id: string;
  title: string;
  description: string;
}> = ({ id, title, description }) => {
  const router = useRouter();

  const clickBookHandler = () => {
    router.push(`/vocabulary/list/${id}/?page=1`);
  };

  return (
    <li id={id} style={{ cursor: "pointer" }} onClick={clickBookHandler}>
      <p>{title}</p>
      <p>{description}</p>
    </li>
  );
};

export default VocabularyBook;
