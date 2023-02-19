import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";
import VocabularyWordDetail from "@/components/vocabulary/word/detail/VocabularyWordDetail";
import { ref, update } from "firebase/database";
import { db } from "@/firebase-config";

const VocabularyWordDetailPage = () => {
  const router = useRouter();
  const { bookId, wordId } = router.query;
  const { currentUser } = useContext(AuthContext);
  const [word, setWord] = useState<Word>({
    id: "",
    word: "",
    pronunciation: "",
    meanings: [{ meaning: "", examples: [] }],
    isMemorized: false,
    createdAt: "",
    modifiedAt: "",
  });

  // TODO: 暗記フラグ機能を共通化したい
  const toggleMemorizedState = async (wordInfo: Word) => {
    if (!currentUser) return;

    const { isMemorized } = wordInfo;
    const path = `users/${currentUser.uid}/${bookId as string}/words/${
      wordInfo.id
    }`;
    const wordRef = ref(db, path);

    await update(wordRef, { isMemorized }).then(() => {
      setWord((prevState) => {
        const currentState = { ...prevState };
        currentState.isMemorized = isMemorized;
        return currentState;
      });
    });
  };

  useEffect(() => {
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/users/${currentUser.uid}/${bookId}/words/${wordId}.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWord({ id: wordId, ...data });
      });
  }, [currentUser]);

  return (
    <MainLayout>
      <h1>Vocabulary Detail Page</h1>
      <VocabularyWordDetail
        bookId={bookId as string}
        wordInfo={word}
        toggleMemorizedState={toggleMemorizedState}
      />
    </MainLayout>
  );
};

export default VocabularyWordDetailPage;
