import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import VocabularyBookList from "@/components/vocabulary/book/VocabularyBookList";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { db } from "@/firebase-config";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import { useRouter } from "next/router";

const VocabularyBookListPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [end, setEnd] = useState<number>(VOCABULARY_LIST_RESULTS);
  const [bookList, setBookList] = useState<Book[]>([]);

  const { currentUser } = useContext(AuthContext);

  // TODO: 並び順も実装
  useEffect(() => {
    if (!currentUser) return;
    if (page) {
      setEnd(VOCABULARY_LIST_RESULTS * +page);
    }

    const path = `users/${currentUser.uid}`;
    const booksRef = ref(db, path);

    const fetchBookList = async () => {
      await get(query(booksRef, orderByChild("createdAt"), limitToLast(end)))
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const bookList: Book[] = [];
          for (const key of Object.keys(value).reverse()) {
            const book: Book = {
              id: key,
              ...value[key],
            };
            bookList.push(book);
          }
          setBookList(bookList);
          setLoading(false);
        });
      // TODO: 例外処理追加
    };

    fetchBookList();
  }, [currentUser]);

  return (
    <MainLayout>
      <Link href="/vocabulary/book/form">Add New Book</Link>
      <VocabularyBookList bookList={bookList} loading={loading} />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
