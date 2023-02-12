import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordList from "@/components/vocabulary/word/VocabularyWordList";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";
import VocabularyWordSearchBox from "@/components/vocabulary/word/VocabularyWordSearchBox";
import { db } from "@/firebase-config";
import { ref, update } from "firebase/database";

const VocabularyWordListPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookId, setBookId] = useState<string>("");
  const [wordList, setWordList] = useState<Word[]>([]);
  const { currentUser } = useContext(AuthContext);

  const filterWordList = (keyword: string) => {
    // TODO: APIを叩く処理を共通化したい
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${currentUser.uid}/${id}/words.json`
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
      });
  };

  const toggleFavoriteState = async (wordInfo: Word) => {
    if (!currentUser || typeof id !== "string") return;

    const { isFavorite } = wordInfo;
    const path = `${currentUser.uid}/${id}/words/${wordInfo.id}`;
    const wordRef = ref(db, path);

    await update(wordRef, { isFavorite }).then(() => {
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

    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${currentUser.uid}/${id}/words.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const wordList = [];
        for (const key in data) {
          const word = {
            id: key,
            ...data[key],
          };
          wordList.push(word);
        }

        setWordList(wordList);
      });
  }, [currentUser, id]);

  return (
    <MainLayout>
      <h1>Word List Page</h1>
      <Link href={`/vocabulary/word/form?book_id=${id}`}>Add New Word</Link>
      <VocabularyWordSearchBox filterWordList={filterWordList} />
      <VocabularyWordList
        bookId={bookId}
        wordList={wordList}
        toggleFavoriteState={toggleFavoriteState}
      />
    </MainLayout>
  );
};

export default VocabularyWordListPage;
