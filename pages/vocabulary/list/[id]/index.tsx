import React, { useCallback, useContext, useEffect, useState } from "react";
import { ref, remove, update } from "firebase/database";

import { AuthContext } from "@/context/auth/AuthContext";
import { GetServerSideProps } from "next";
import MainLayout from "@/components/layout/MainLayout";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import VocabularyWordList from "@/components/vocabulary/word/VocabularyWordList";
import { Word } from "@/types/Vocabulary";
import { WordHelper } from "@/helpers/word-helper";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** 単語帳id. */
  bookId: string;
}

/** 単語関連ヘルパー. */
const wordHelper = new WordHelper();

/**
 * 単語リスト画面.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語リスト画面.
 */
const VocabularyWordListPage = ({ bookId }: Props) => {
  // ルーター
  const router = useRouter();
  const { page } = router.query;
  // 現在のページ
  const [currentPage, setCurrentPage] = useState<number>(1);
  // キーワードに一致する単語が見つかったか
  const [isFoundFilteredWord, setisFoundFilteredWord] = useState<boolean>(true);
  // 次に読み込むデータが存在するか
  const [hasMore, setHasMore] = useState<boolean>(false);
  // 最後のデータ
  const [endValue, setEndValue] = useState<{ createdAt: string; key: string }>({
    createdAt: "",
    key: "",
  });
  // ローディング中か
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wordList, setWordList] = useState<Word[]>([]);
  // 現在のユーザーid
  const { currentUserId } = useContext(AuthContext);
  // 単語を絞り込む
  const filterWordList = useCallback(
    async (keyword: string) => {
      setIsLoading(true);
      setHasMore(false);

      // idが存在しない場合、早期リターン
      if (!currentUserId) {
        return;
      }

      const filteredWordList: Word[] = [];

      // キーワードが空の場合、fetchWordListから単語リストを取得し、早期リターン
      if (!keyword) {
        await fetchWordList(1);
        return;
      }

      await wordHelper
        .filterWordList(currentUserId, bookId)
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          // 検索でヒットしなかった場合、空配列をセットして早期リターン
          if (!value) {
            setWordList(filteredWordList);
            setisFoundFilteredWord(false);
            setIsLoading(false);
            return;
          }

          for (const key of Object.keys(value).reverse()) {
            const word: Word = {
              id: key,
              ...value[key],
            };

            if (
              wordHelper.containsKeyword(word.words, keyword) ||
              wordHelper.containsKeyword(word.pronunciations, keyword)
            ) {
              filteredWordList.push(word);
            }
          }
          setWordList(filteredWordList);
          setisFoundFilteredWord(!!filteredWordList.length);
          setHasMore(filteredWordList.length >= VOCABULARY_LIST_RESULTS);
          setIsLoading(false);
        });
    },
    [wordList]
  );

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
  const fetchWordList = async (page: number) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    setHasMore(false);
    setCurrentPage(page);

    if (!bookId) {
      setWordList([]);
      setCurrentPage(0);
      setIsLoading(false);
      return;
    }

    await wordHelper
      .fetchWordList(
        currentUserId,
        bookId,
        page === 1
          ? {
              createdAt: "",
              key: "",
            }
          : endValue
      )
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
          const newWordList =
            page === 1 ? [...result] : [...wordList, ...result];
          setWordList(newWordList);
          setisFoundFilteredWord(!!newWordList.length);
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
          // 浅いルーティング
          // https://nextjs-ja-translation-docs.vercel.app/docs/routing/shallow-routing
          { scroll: false, shallow: true }
        );
      });
  };
  // 単語削除イベントハンドラ
  const deleteWordHandler = async (wordId: string) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const path = `users/${currentUserId}/${bookId}/words/${wordId}`;
    const wordRef = ref(db, path);

    await remove(wordRef).then(() => {
      // 画面をリロード
      router.reload();
    });
    // TODO: 例外処理追加
  };

  // TODO: 並び順も実装
  useEffect(() => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    fetchWordList(page ? +page : 1);
  }, [currentUserId, bookId, page]);

  return (
    <MainLayout showQuiz={true} showWordList={true} bookId={bookId}>
      {/* 単語リスト */}
      <VocabularyWordList
        currentPage={currentPage}
        isFoundFilteredWord={isFoundFilteredWord}
        hasMore={hasMore}
        bookId={bookId}
        wordList={wordList}
        filterWordList={filterWordList}
        isLoading={isLoading}
        fetchWordList={fetchWordList}
        toggleMemorizedState={toggleMemorizedState}
        deleteWordHandler={deleteWordHandler}
      />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const id = params?.id;

  // 単語帳idが存在しない場合、notFoundをtrueにしてリターン
  if (!id) {
    return { notFound: true };
  }

  return { props: { bookId: id } };
};

export default VocabularyWordListPage;
