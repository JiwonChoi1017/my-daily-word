import React, { useContext, useEffect, useState } from "react";
import { get, push, ref, update } from "firebase/database";

import { AuthContext } from "@/context/auth/AuthContext";
import { GetServerSideProps } from "next";
import MainLayout from "@/components/layout/MainLayout";
import { ParsedUrlQuery } from "querystring";
import VocabularyWordForm from "@/components/vocabulary/word/form/VocabularyWordForm";
import { Word } from "@/types/Vocabulary";
import { WordHelper } from "@/helpers/word-helper";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** (任意)遷移元. */
  referer?: string;
  /** (任意)クエリ. */
  query?: ParsedUrlQuery;
}

/** 単語関連ヘルパー. */
const wordHelper = new WordHelper();

/**
 * 単語フォーム画面.
 *
 * @param referer - (任意)遷移元.
 * @param query - (任意)クエリ.
 * @returns {JSX.Element} 単語フォーム画面.
 */
const VocabularyWordFormPage = ({ referer, query }: Props) => {
  // 単語帳id
  const [bookId, setBookId] = useState<string>("");
  // 単語id
  const [wordId, setWordId] = useState<string>("");
  // 単語状態
  const [word, setWord] = useState<Word>({
    id: "",
    words: [],
    pronunciations: [],
    meanings: [{ meaning: "", examples: [] }],
    isMemorized: false,
    createdAt: "",
    updatedAt: "",
  });
  // キャンセルボタンの表示状態
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);
  // 重複する単語リスト
  const [duplicateWordList, setDuplicateWordList] = useState<Word[]>([]);
  // 現在のユーザーid
  const { currentUserId } = useContext(AuthContext);
  // ルーター
  const router = useRouter();

  useEffect(() => {
    if (referer) {
      // 現在のURL
      const { origin, pathname } = location;
      const currentUrl = `${origin}${pathname}`;
      // 遷移元と現在のURLが一致しない場合、trueをセット
      setShowCancelButton(referer !== currentUrl);
    }

    // クエリが存在しない場合、早期リターン
    if (!query) {
      return;
    }

    // クエリから単語帳と単語idを取得
    const { bookId, wordId } = query;

    if (!bookId || typeof bookId !== "string") {
      return;
    }

    setBookId(bookId);

    // 現在のユーザーid、もしくは単語idが存在しない場合、早期リターン
    if (!currentUserId || !wordId || typeof wordId !== "string") {
      return;
    }

    setWordId(wordId);

    const path = `users/${currentUserId}/${bookId}/words/${wordId}`;
    const wordRef = ref(db, path);
    // 単語を取得
    const fetchWord = async () => {
      await get(wordRef)
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          setWord({
            id: wordId,
            ...value,
          });
        });
      // TODO: 例外処理追加
    };
    fetchWord();
  }, [currentUserId]);

  // 重複する単語を取得
  const findDuplicateWords = async (keyword: string) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    await wordHelper
      .filterWordList(currentUserId, bookId)
      .then((response) => {
        return response.val();
      })
      .then((value) => {
        const wordList = [];
        for (const key of Object.keys(value).reverse()) {
          const word: Word = {
            id: key,
            ...value[key],
          };
          if (
            !keyword ||
            wordHelper.containsKeyword(word.words, keyword) ||
            wordHelper.containsKeyword(word.pronunciations, keyword)
          ) {
            wordList.push(word);
          }
        }
        setDuplicateWordList(wordList);
      });
  };

  // 単語追加イベント
  const addWord = async (wordInfo: Omit<Word, "id" | "updatedAt">) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const wordPath = `users/${currentUserId}/${bookId}/words`;
    const userRef = ref(db, wordPath);

    await push(userRef, wordInfo)
      .then(() => {
        router.push(`/vocabulary/list/${bookId}/?page=1`);
      })
      .catch();
  };
  // 単語更新イベント
  const updateWord = async (wordInfo: Word) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const { words, pronunciations, meanings, updatedAt } = wordInfo;
    const path = `users/${currentUserId}/${bookId}/words/${wordId}`;
    const wordRef = ref(db, path);

    await update(wordRef, { words, pronunciations, meanings, updatedAt }).then(
      () => {
        router.push(`/vocabulary/detail/${bookId}/${wordId}`);
      }
    );
    // TODO: 例外処理追加
  };
  // 前のページへ戻る
  const goBackPreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <MainLayout showQuiz={true} showWordList={true} bookId={bookId as string}>
      <VocabularyWordForm
        isModifyForm={!!wordId}
        wordInfo={word}
        duplicateWordList={duplicateWordList}
        findDuplicateWords={findDuplicateWords}
        addWord={addWord}
        updateWord={updateWord}
        showCancelButton={showCancelButton}
        onClickCancelButton={goBackPreviousPage}
      />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context) {
    return { props: {} };
  }
  // contextから遷移元の情報を取得
  const referer = context.req.headers.referer ?? null;
  const query = context.query;

  return { props: { referer, query } };
};

export default VocabularyWordFormPage;
