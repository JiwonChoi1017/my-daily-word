import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";

// TODO: 修正・削除機能・お気に入り追加機能も実装
/**
 * 単語帳.
 *
 * @param {string} id - id.
 * @param {string} title - タイトル.
 * @param {string} description - 説明文.
 * @returns {JSX.Element} 単語帳.
 */
const VocabularyBook: React.FC<{
  id: string;
  title: string;
  description: string;
}> = ({ id, title, description }) => {
  const router = useRouter();
  // 単語帳クリックイベント
  const clickBookHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/vocabulary/list/${id}/?page=1`);
  };

  return (
    <Card clickHandler={clickBookHandler}>
      <div
        id={id}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          clickBookHandler(e);
        }}
      >
        <div className="title__wrap">
          <span className="title">{title}</span>
        </div>
        <p className="description">{description}</p>
      </div>
    </Card>
  );
};

export default VocabularyBook;
