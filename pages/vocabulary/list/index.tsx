import React, { useContext, useEffect, useState } from "react";
import {
  endBefore,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
  remove,
  update,
} from "firebase/database";

import { AuthContext } from "@/context/auth/AuthContext";
import { Book } from "@/types/Vocabulary";
import MainLayout from "@/components/layout/MainLayout";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import VocabularyBookList from "@/components/vocabulary/book/VocabularyBookList";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";

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
  // 現在のユーザーid
  const { currentUserId } = useContext(AuthContext);
  // お気に入り状態更新イベント
  const toggleFavoriteState = async (bookInfo: Book) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const { id, isFavorite } = bookInfo;
    const path = `users/${currentUserId}/${id}`;
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
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    setHasMore(false);
    setCurrentPage(page);

    const path = `users/${currentUserId}`;
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

  // 単語帳削除イベントハンドラ
  const deleteBookHandler = async (bookId: string) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const path = `uses/${currentUserId}/${bookId}`;
    const bookRef = ref(db, path);

    await remove(bookRef).then(() => {
      // 画面をリロード
      router.reload();
    });
  };

  // TODO: 並び順も実装
  useEffect(() => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    fetchBookList(page ? +page : 1);
  }, [currentUserId, page]);

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
        deleteBookHandler={deleteBookHandler}
      />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
