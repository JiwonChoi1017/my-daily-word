import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordList from "@/components/vocabulary/word/VocabularyWordList";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";
import { db } from "@/firebase-config";
import {
  endBefore,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";

/**
 * 単語リスト画面.
 *
 * @returns {JSX.Element} 単語リスト画面.
 */
const VocabularyWordListPage = () => {
  // ルーター
  const router = useRouter();
  const { id, page } = router.query;
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
  const [bookId, setBookId] = useState<string>("");
  const [wordList, setWordList] = useState<Word[]>([]);
  // 現在のユーザーid
  const { currentUserId } = useContext(AuthContext);
  // 単語を絞り込む
  const filterWordList = (keyword: string) => {
    setIsLoading(true);
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const path = `users/${currentUserId}/${bookId}/words`;
    const wordsRef = ref(db, path);
    // TODO: APIを叩く処理を共通化したい
    const fetchWordList = async () => {
      await get(wordsRef)
        .then((response) => {
          return response.val();
        })
        .then((data) => {
          const wordList = [];
          for (const key in data) {
            const word: Word = {
              id: key,
              ...data[key],
            };
            if (!keyword || word.word.startsWith(keyword)) {
              wordList.push(word);
            }
          }
          setWordList(wordList);
          setIsLoading(false);
        });
    };
    fetchWordList();
  };

  // 暗記状態を更新
  const toggleMemorizedState = async (wordInfo: Word) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const { isMemorized } = wordInfo;
    const path = `users/${currentUserId}/${bookId}/words/${wordInfo.id}`;
    const wordRef = ref(db, path);

    await update(wordRef, { isMemorized }).then(() => {
      const targetIndex = wordList.findIndex((word) => word.id === wordInfo.id);
      setWordList((prevState) => {
        const currentState = [...prevState];
        currentState[targetIndex] = wordInfo;
        return currentState;
      });
    });
  };

  // 単語リストを取得
  const fetchWordist = async (page: number) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    setHasMore(false);
    setCurrentPage(page);

    if (!bookId) {
      setWordList([]);
      setHasMore(false);
      setCurrentPage(0);
      setIsLoading(false);
      return;
    }

    const path = `users/${currentUserId}/${bookId}/words`;
    const wordsRef = ref(db, path);
    const fetchWordQuery =
      endValue.createdAt && endValue.key
        ? query(
            wordsRef,
            orderByChild("createdAt"),
            endBefore(endValue.createdAt, endValue.key),
            limitToLast(VOCABULARY_LIST_RESULTS)
          )
        : query(
            wordsRef,
            orderByChild("createdAt"),
            limitToLast(VOCABULARY_LIST_RESULTS)
          );

    await get(fetchWordQuery)
      .then((response) => {
        return response.val();
      })
      .then((value) => {
        const result: Word[] = [];
        // ゼロマッチ
        if (!value) {
          setWordList([...wordList]);
          setHasMore(false);
        } else {
          for (const key of Object.keys(value).reverse()) {
            const word: Word = {
              id: key,
              ...value[key],
            };
            result.push(word);
          }
          const { id, createdAt } = result[result.length - 1];
          setWordList([...wordList, ...result]);
          setHasMore(result.length >= VOCABULARY_LIST_RESULTS);
          setEndValue({ createdAt, key: id });
        }
        setIsLoading(false);

        router.replace(
          {
            pathname: `/vocabulary/list/${bookId}`,
            query: { page },
          },
          undefined,
          { scroll: false }
        );
      });
  };

  // TODO: 並び順も実装
  useEffect(() => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    // 文字列の場合はそのままセット
    if (typeof id === "string") {
      setBookId(id);
      // 配列の場合、０番目の値をセット
    } else if (Array.isArray(id)) {
      setBookId(id[0]);
    }

    fetchWordist(page ? +page : 1);
  }, [currentUserId, bookId, page]);

  return (
    <MainLayout showQuiz={true} showWordList={true} bookId={bookId}>
      {/* 単語リスト */}
      <VocabularyWordList
        currentPage={currentPage}
        hasMore={hasMore}
        bookId={bookId}
        wordList={wordList}
        filterWordList={filterWordList}
        isLoading={isLoading}
        fetchWordList={fetchWordist}
        toggleMemorizedState={toggleMemorizedState}
      />
    </MainLayout>
  );
};

export default VocabularyWordListPage;
