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

  // TODO: 次ページも取得するように、並び順も実装
  // https://cpoint-lab.co.jp/article/202107/20639/
  useEffect(() => {
    const fetchBookList = async () => {
      if (!currentUser) return;
      if (page) {
        setEnd(VOCABULARY_LIST_RESULTS * +page);
      }

      const path = `users/${currentUser.uid}`;
      const booksRef = ref(db, path);
      await get(query(booksRef, orderByChild("createdAt"), limitToLast(end)))
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const bookList = [];
          for (const key of Object.keys(value).reverse()) {
            const book = {
              id: key,
              ...value[key],
            };
            bookList.push(book);
          }
          setBookList(bookList);
          setLoading(false);
        });
    };

    fetchBookList();
  }, [currentUser]);

  return (
    <MainLayout>
      <h1>Vocabulary Book List Page</h1>
      <Link href="/vocabulary/book/form">Add New Book</Link>
      <VocabularyBookList bookList={bookList} loading={loading} />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
