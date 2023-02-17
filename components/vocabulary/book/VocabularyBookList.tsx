import { Book } from "@/types/Vocabulary";
import React from "react";
import VocabularyBook from "./VocabularyBook";

const VocabularyBookList: React.FC<{ bookList: Book[]; loading: boolean }> = ({
  bookList,
  loading,
}) => {
  const bookListHtml = loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <ul>
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
      </ul>
    </div>
  );
  return bookListHtml;
};

export default VocabularyBookList;
