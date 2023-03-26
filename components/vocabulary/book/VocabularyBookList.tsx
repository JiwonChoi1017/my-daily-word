import Loader from "@/components/layout/Loader";
import { Book } from "@/types/Vocabulary";
import React from "react";
import VocabularyBook from "./VocabularyBook";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

/**
 * 単語帳リスト.
 *
 * @param {Book[]} bookList - 単語帳リスト.
 * @param {boolean} isLoading - ローディング中か.
 * @param {function} toggleFavoriteState - お気に入り状態更新イベント.
 * @returns {JSX.Element} 単語帳リスト.
 */
const VocabularyBookList: React.FC<{
  bookList: Book[];
  isLoading: boolean;
  toggleFavoriteState: (bookInfo: Book) => void;
}> = ({ bookList, isLoading, toggleFavoriteState }) => {
  // ルーター
  const router = useRouter();
  // 単語帳フォームに遷移
  const moveToVocabularyBookForm = () => {
    router.push("/vocabulary/book/form");
  };
  // 単語帳追加アイコン
  const addBookIcon = (
    <div className="addIcon" onClick={moveToVocabularyBookForm}>
      <FaPlus />
    </div>
  );
  // 単語帳リスト
  const bookListHtml = isLoading ? (
    <Loader />
  ) : (
    <>
      {addBookIcon}
      {bookList.map((book) => {
        return (
          <VocabularyBook
            key={book.id}
            bookInfo={book}
            toggleFavoriteState={toggleFavoriteState}
          />
        );
      })}
    </>
  );
  return bookListHtml;
};

export default VocabularyBookList;
