import React, { createContext, useState } from "react";
// TODO：localStorageを使うようにしないとダメかも？
type BookInfo = {
  id: string;
  title: string;
} | null;

type BookInfoContext = {
  book: BookInfo;
  setBook: React.Dispatch<React.SetStateAction<BookInfo>>;
};

export const BookContext = createContext<BookInfoContext>(
  {} as BookInfoContext
);

export const BookProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [book, setBook] = useState<BookInfo | null>(null);

  return (
    <BookContext.Provider value={{ book, setBook }}>
      {children}
    </BookContext.Provider>
  );
};
