import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { AuthContext } from "@/context/auth/AuthProvider";
import {
  get,
  limitToFirst,
  limitToLast,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { db } from "@/firebase-config";
import { Book, Word } from "@/types/Vocabulary";
import VocabularyWord from "@/components/vocabulary/word/VocabularyWord";
import Button from "@/components/layout/Button";
import { useRouter } from "next/router";
import classes from "@/components/layout/Button.module.css";
import { v4 as uuidv4 } from "uuid";
import { ErrorInfo } from "@/types/Error";
import { ERROR_STATUS } from "@/constants/constants";
import NotFound from "@/components/error/NotFound";

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
    modifiedAt: "",
  });
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({
    status: ERROR_STATUS.SUCCESS,
    code: 200,
    message: "",
  });

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    // idが存在しない場合、早期リターン
    if (!userId) {
      setErrorInfo({
        status: ERROR_STATUS.NOT_FOUND_USER,
        code: 404,
        message: "ユーザが見つかりませんでした。",
      });
      setIsLoading(false);
      return;
    }

    const fetchRandomWord = async () => {
      const booksPath = `users/${userId}`;
      const booksRef = ref(db, booksPath);

      const bookId = await get(
        query(booksRef, orderByChild("isFavorite"), limitToLast(1))
      )
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const firstBookKey = Object.keys(value)[0];
          const firstBook: Book = value[firstBookKey];
          setBookTitle(firstBook.title);
          return firstBookKey;
        })
        .catch(() => {
          setIsLoading(false);
          setErrorInfo({
            status: ERROR_STATUS.NOT_FOUND_BOOK,
            code: 404,
            message:
              "単語帳が見つかりませんでした。<br/>新しい単語帳を追加してください。",
          });
        });

      if (!bookId) {
        return;
      }

      const wordsPath = `users/${userId}/${bookId}/words`;
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
            code: 404,
            message:
              "単語が見つかりませんでした。<br/>新しい単語を追加してください。",
          });
        });

      setBookId(bookId);
      setIsLoading(false);
    };

    fetchRandomWord();
  }, [currentUser]);

  // 暗記状態をトーグル
  const toggleMemorizedState = async (wordInfo: Word) => {
    if (!currentUser) return;

    const { isMemorized } = wordInfo;
    const path = `users/${currentUser.uid}/${bookId}/words/${wordInfo.id}`;
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
                className={classes.button}
                text={`「${bookTitle}」単語帳へ`}
                clickHandler={moveToVocabularyWordList}
              />
              <Button
                className={classes.button}
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
