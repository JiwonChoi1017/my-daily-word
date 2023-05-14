import { Book, Word } from "@/types/Vocabulary";
import React, { useContext, useEffect, useState } from "react";
import {
  get,
  limitToFirst,
  limitToLast,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";

import { AuthContext } from "@/context/auth/AuthContext";
import { Button } from "@/components/ui/Button";
import { ERROR_STATUS } from "@/constants/constants";
import { ErrorInfo } from "@/types/Error";
import MainLayout from "@/components/layout/MainLayout";
import NotFound from "@/components/error/NotFound";
import VocabularyWord from "@/components/vocabulary/word/VocabularyWord";
import classes from "@/styles/Button.module.css";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";

/**
 * ホーム画面.
 *
 * @returns {JSX.Element} ホーム画面.
 */
export default function Home() {
  // ローディング中か
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookId, setBookId] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [randomWord, setRandomWord] = useState<Word>({
    id: "",
    word: "",
    pronunciation: "",
    meanings: [{ meaning: "", examples: [] }],
    isMemorized: false,
    createdAt: "",
    updatedAt: "",
  });
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({
    status: ERROR_STATUS.SUCCESS,
    code: "",
    message: "",
  });

  const { currentUserId } = useContext(AuthContext);

  useEffect(() => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const fetchRandomWord = async () => {
      const booksPath = `users/${currentUserId}`;
      const booksRef = ref(db, booksPath);

      const bookId = await get(
        query(booksRef, orderByChild("isFavorite"), limitToLast(10))
      )
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const bookList = { ...value };
          const bookIdList: string[] = Object.keys(bookList);
          // 単語が存在する単語帳idのみ取得し、新しい配列を生成
          const filteredBookIdList = bookIdList.filter((key) => {
            const wordList = bookList[key].words
              ? Object.keys(bookList[key].words)
              : [];
            return !!wordList.length;
          });

          if (!filteredBookIdList.length) {
            setIsLoading(false);
            setErrorInfo({
              status: ERROR_STATUS.NOT_FOUND_WORD,
              code: "not-exist-vocabulary-word",
              message:
                "単語が見つかりませんでした。<br/>新しい単語を追加してください。",
            });
            return;
          }
          const firstBookKey = filteredBookIdList[0];
          const firstBook: Book = value[firstBookKey];
          setBookTitle(firstBook.title);
          return firstBookKey;
        })
        .catch(() => {
          setIsLoading(false);
          setErrorInfo({
            status: ERROR_STATUS.NOT_FOUND_BOOK,
            code: "not-exist-vocabulary-book",
            message:
              "単語帳が見つかりませんでした。<br/>新しい単語帳を追加してください。",
          });
        });

      if (!bookId) {
        return;
      }

      const wordsPath = `users/${currentUserId}/${bookId}/words`;
      const wordsRef = ref(db, wordsPath);

      await get(query(wordsRef, orderByChild("isMemorized"), limitToFirst(10)))
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const wordList: Word[] = [];
          for (const key of Object.keys(value)) {
            const word: Word = {
              id: key,
              ...value[key],
            };
            wordList.push(word);
          }
          const randomIndex = Math.floor(Math.random() * wordList.length);
          setRandomWord(wordList[randomIndex]);
        })
        .catch(() => {
          setIsLoading(false);
          setErrorInfo({
            status: ERROR_STATUS.NOT_FOUND_WORD,
            code: "not-exist-vocabulary-word",
            message:
              "単語が見つかりませんでした。<br/>新しい単語を追加してください。",
          });
        });

      setBookId(bookId);
      setIsLoading(false);
    };

    fetchRandomWord();
  }, [currentUserId]);

  // 暗記状態をトーグル
  const toggleMemorizedState = async (wordInfo: Word) => {
    const { isMemorized } = wordInfo;
    const path = `users/${currentUserId}/${bookId}/words/${wordInfo.id}`;
    const wordRef = ref(db, path);

    await update(wordRef, { isMemorized }).then(() => {
      setRandomWord((prevState: Word) => {
        const currentState = { ...prevState };
        currentState.isMemorized = isMemorized;
        return currentState;
      });
    });
  };

  const router = useRouter();
  // 該当単語帳の単語リストに遷移
  const moveToVocabularyWordList = () => {
    router.push(`/vocabulary/list/${bookId}?page=1`);
  };
  // 単語帳リストに遷移
  const moveToVocabularyBookList = () => {
    router.push(`/vocabulary/list?page=1`);
  };

  return (
    <MainLayout showNavigation={false}>
      {errorInfo.status === ERROR_STATUS.SUCCESS ? (
        <>
          {/* 今日の単語 */}
          <VocabularyWord
            isLoading={isLoading}
            bookId={bookId}
            wordInfo={randomWord}
            toggleMemorizedState={toggleMemorizedState}
          />
          {/* ボタン */}
          {!isLoading && (
            <div className={classes.button__wrap}>
              <Button
                className="button"
                text={`「${bookTitle}」単語帳へ`}
                clickHandler={moveToVocabularyWordList}
              />
              <Button
                className="button"
                text={`単語帳リストへ`}
                clickHandler={moveToVocabularyBookList}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <NotFound errorInfo={errorInfo} />
        </>
      )}
    </MainLayout>
  );
}
