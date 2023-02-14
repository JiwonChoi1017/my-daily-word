import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import VocabularyBookList from "@/components/vocabulary/book/VocabularyBookList";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";

const VocabularyBookListPage = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const { currentUser } = useContext(AuthContext);

  // TODO: ページネーションを実装したい（下記を参考）
  // https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=ja
  // あと、並び順も
  useEffect(() => {
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${currentUser.uid}.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const bookList = [];
        for (const key in data) {
          const book = {
            id: key,
            ...data[key],
          };
          bookList.push(book);
        }
        setBookList(bookList);
      });
  }, [currentUser]);

  return (
    <MainLayout>
      <h1>Vocabulary Book List Page</h1>
      <Link href="/vocabulary/book/form">Add New Book</Link>
      <VocabularyBookList bookList={bookList} />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
