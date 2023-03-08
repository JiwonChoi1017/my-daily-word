import React, { useContext, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyQuizSelectModal from "@/components/vocabulary/quiz/VocabularyQuizSelectModal";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, ref } from "firebase/database";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import VocabularyQuizList from "@/components/vocabulary/quiz/VocabularyQuizList";

const VocabularyQuizPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const [showModal, setShowModal] = useState<boolean>(true);
  const [wordList, setWordList] = useState<Word[]>([]);
  const [currentQuizNumber, setCurrentQuizNumber] = useState<number>(0);

  const { currentUser } = useContext(AuthContext);

  const fetchQuizWord = () => {
    setShowModal(false);
  };

  const fetchQuizMeaning = () => {
    setShowModal(false);
  };

  const fetchAllWords = async () => {
    if (!currentUser) return;

    const path = `users/${currentUser.uid}/${id}/words`;
    const wordsRef = ref(db, path);

    await get(wordsRef)
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
        setWordList(wordList);
      });
  };

  return (
    <MainLayout>
      <h1>Vocabulary Quiz Page</h1>
      <VocabularyQuizSelectModal
        show={showModal}
        fetchQuizWord={fetchQuizWord}
        fetchQuizMeaning={fetchQuizMeaning}
      />
      <VocabularyQuizList
        show={!showModal}
        currentQuizNumber={currentQuizNumber}
      />
    </MainLayout>
  );
};

export default VocabularyQuizPage;
