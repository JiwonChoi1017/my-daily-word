import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordList from "@/components/vocabulary/word/VocabularyWordList";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";
import VocabularyWordSearchBox from "@/components/vocabulary/word/VocabularyWordSearchBox";
import { db } from "@/firebase-config";
import {
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
  const router = useRouter();
  const { id, page } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [end, setEnd] = useState<number>(VOCABULARY_LIST_RESULTS);
  const [bookId, setBookId] = useState<string>("");
  const [wordList, setWordList] = useState<Word[]>([]);

  const { currentUser } = useContext(AuthContext);

  const filterWordList = (keyword: string) => {
    setIsLoading(true);
    // TODO: APIを叩く処理を共通化したい
    // あと、未ログイン時も使えるようにしたい
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/users/${currentUser.uid}/${id}/words.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
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

  const toggleMemorizedState = async (wordInfo: Word) => {
    if (!currentUser || typeof id !== "string") return;

    const { isMemorized } = wordInfo;
    const path = `users/${currentUser.uid}/${id}/words/${wordInfo.id}`;
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

  useEffect(() => {
    if (!id) {
      return;
    }

    // 文字列の場合はそのままセット
    if (typeof id === "string") {
      setBookId(id);
      // 配列の場合、０番目の値をセット
    } else if (Array.isArray(id)) {
      setBookId(id[0]);
    }

    // TODO: 並び順も実装
    const fetchWordist = async () => {
      if (!currentUser) return;
      if (page) {
        setEnd(VOCABULARY_LIST_RESULTS * +page);
      }

      const path = `users/${currentUser.uid}/${id}/words`;
      const wordsRef = ref(db, path);

      await get(query(wordsRef, orderByChild("createdAt"), limitToLast(end)))
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const wordList: Word[] = [];
          // ゼロマッチ
          if (!value) {
            setWordList([]);
            setIsLoading(false);
            return;
          }
          for (const key of Object.keys(value).reverse()) {
            const word: Word = {
              id: key,
              ...value[key],
            };
            wordList.push(word);
          }
          setWordList(wordList);
          setIsLoading(false);
        });
    };

    fetchWordist();
  }, [currentUser, id]);

  return (
    <MainLayout>
      <Link href={`/vocabulary/word/form?book_id=${id}`}>Add New Word</Link>
      <VocabularyWordSearchBox filterWordList={filterWordList} />
      {/* 単語リスト */}
      <VocabularyWordList
        bookId={bookId}
        wordList={wordList}
        toggleMemorizedState={toggleMemorizedState}
        isLoading={isLoading}
      />
    </MainLayout>
  );
};

export default VocabularyWordListPage;
