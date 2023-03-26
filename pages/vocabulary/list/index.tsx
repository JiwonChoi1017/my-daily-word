import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyBookList from "@/components/vocabulary/book/VocabularyBookList";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, limitToLast, orderByChild, query, ref } from "firebase/database";
import { db } from "@/firebase-config";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

/**
 * 単語帳リスト画面.
 *
 * @returns {JSX.Element} 単語帳リスト画面.
 */
const VocabularyBookListPage = () => {
  // ルーター
  const router = useRouter();
  const { page } = router.query;
  // ローディング中か
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [end, setEnd] = useState<number>(VOCABULARY_LIST_RESULTS);
  const [bookList, setBookList] = useState<Book[]>([]);
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);

  // TODO: 並び順も実装
  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    if (page) {
      setEnd(VOCABULARY_LIST_RESULTS * +page);
    }

    const path = `users/${userId}`;
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
          setIsLoading(false);
        });
      // TODO: 例外処理追加
    };

    fetchBookList();
  }, [currentUser]);

  return (
    <MainLayout showNavigation={false}>
      {/* 単語帳リスト */}
      <VocabularyBookList bookList={bookList} isLoading={isLoading} />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
