import Loader from "@/components/layout/Loader";
import { Book } from "@/types/Vocabulary";
import React from "react";
import VocabularyBook from "./VocabularyBook";

/**
 * 単語帳リスト.
 *
 * @param {Book[]} bookList - 単語帳リスト.
 * @param {boolean} isLoading - ローディング中か.
 * @returns {JSX.Element} 単語帳リスト.
 */
const VocabularyBookList: React.FC<{
  bookList: Book[];
  isLoading: boolean;
}> = ({ bookList, isLoading }) => {
  const bookListHtml = isLoading ? (
    <Loader />
  ) : (
    <>
      {bookList.map((book) => {
        return (
          <VocabularyBook
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
          />
        );
      })}
    </>
  );
  return bookListHtml;
};

export default VocabularyBookList;
