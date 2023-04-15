import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyBookList from "@/components/vocabulary/book/VocabularyBookList";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import {
  endBefore,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
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
  // 現在のページ
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 次に読み込むデータが存在するか
  const [hasMore, setHasMore] = useState<boolean>(false);
  // 最後のデータ
  const [endValue, setEndValue] = useState<{ createdAt: string; key: string }>({
    createdAt: "",
    key: "",
  });
  // ローディング中か
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookList, setBookList] = useState<Book[]>([]);
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);
  // お気に入り状態更新イベント
  const toggleFavoriteState = async (bookInfo: Book) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) return;

    const { id, isFavorite } = bookInfo;
    const path = `users/${userId}/${id}`;
    const bookRef = ref(db, path);

    await update(bookRef, { isFavorite }).then(() => {
      const targetIndex = bookList.findIndex((book) => book.id === id);
      setBookList((prevState) => {
        const currentState = [...prevState];
        currentState[targetIndex] = bookInfo;
        return currentState;
      });
    });
  };

  // 単語帳リストを取得
  const fetchBookList = async (page: number) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    setHasMore(false);
    setCurrentPage(page);

    const path = `users/${userId}`;
    const booksRef = ref(db, path);
    const fetchBookQuery =
      endValue.createdAt && endValue.key
        ? query(
            booksRef,
            orderByChild("createdAt"),
            endBefore(endValue.createdAt, endValue.key),
            limitToLast(VOCABULARY_LIST_RESULTS)
          )
        : query(
            booksRef,
            orderByChild("createdAt"),
            limitToLast(VOCABULARY_LIST_RESULTS)
          );
    await get(fetchBookQuery)
      .then((response) => {
        return response.val();
      })
      .then((value) => {
        const result: Book[] = [];
        // ゼロマッチ
        if (!value) {
          setBookList([...bookList]);
          setHasMore(false);
        } else {
          for (const key of Object.keys(value).reverse()) {
            const book: Book = {
              id: key,
              ...value[key],
            };
            result.push(book);
          }
          const { id, createdAt } = result[result.length - 1];
          setBookList([...bookList, ...result]);
          setHasMore(result.length >= VOCABULARY_LIST_RESULTS);
          setEndValue({ createdAt, key: id });
        }

        setIsLoading(false);

        router.replace(
          {
            pathname: "/vocabulary/list",
            query: { page },
          },
          undefined,
          { scroll: false }
        );
      });
  };

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

    fetchBookList(page ? +page : 1);
  }, [currentUser]);

  return (
    <MainLayout showNavigation={false}>
      {/* 単語帳リスト */}
      <VocabularyBookList
        currentPage={currentPage}
        hasMore={hasMore}
        bookList={bookList}
        isLoading={isLoading}
        fetchBookList={fetchBookList}
        toggleFavoriteState={toggleFavoriteState}
      />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
