import React, { useContext, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyQuizSelectModal from "@/components/vocabulary/quiz/VocabularyQuizSelectModal";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, ref } from "firebase/database";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import VocabularyQuizItem from "@/components/vocabulary/quiz/VocabularyQuizItem";
import { VOCABULARY_QUIZ_COUNT } from "@/constants/constants";

const VocabularyQuizPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const [showModal, setShowModal] = useState<boolean>(true);
  const [quizKind, setQuizKind] = useState<"word" | "meaning">("word");
  const [currentQuizNumber, setCurrentQuizNumber] = useState<number>(0);
  const [answersList, setAnswersList] = useState<string[][]>([]);
  const [correctAnswerList, setCorrectAnswerList] = useState<
    { id: string; word: string; meaning: string }[]
  >([]);

  const { currentUser } = useContext(AuthContext);

  const fetchQuizWord = async () => {
    const wordList = await fetchAllWords();
    const quizCount =
      wordList.length >= VOCABULARY_QUIZ_COUNT
        ? VOCABULARY_QUIZ_COUNT
        : wordList.length;
    const questionIndexList: number[] = [];
    const answersList: string[][] = [];
    const correctAnswerList: { id: string; word: string; meaning: string }[] =
      [];

    let questionCount = 0;

    while (questionCount < quizCount) {
      const answerIndexList: number[] = [];
      const tempAnswerList = [];

      const randomWordIndex = Math.floor(Math.random() * wordList.length);
      if (questionIndexList.includes(randomWordIndex)) continue;
      const { id, word, meanings } = wordList[randomWordIndex];
      const randomMeaningIndex = Math.floor(Math.random() * meanings.length);
      const { meaning } = meanings[randomMeaningIndex];

      questionIndexList.push(randomWordIndex);
      answerIndexList.push(randomWordIndex);
      tempAnswerList.push(word);
      correctAnswerList.push({ id, word, meaning });

      questionCount++;

      let answerCount = 0;
      while (answerCount < 3) {
        const randomWordIndex = Math.floor(Math.random() * wordList.length);
        if (answerIndexList.includes(randomWordIndex)) continue;
        const { word } = wordList[randomWordIndex];

        answerIndexList.push(randomWordIndex);
        tempAnswerList.push(word);

        answerCount++;
      }

      answersList.push(shuffleArray(tempAnswerList));
    }
    setQuizKind("word");
    setAnswersList(answersList);
    setCorrectAnswerList(correctAnswerList);
    setShowModal(false);
  };

  const fetchQuizMeaning = () => {
    setShowModal(false);

    const wordList = fetchAllWords();
  };

  const fetchAllWords = async () => {
    if (!currentUser) return [];

    const path = `users/${currentUser.uid}/${id}/words`;
    const wordsRef = ref(db, path);
    const wordList: Word[] = [];

    await get(wordsRef)
      .then((response) => {
        return response.val();
      })
      .then((value) => {
        for (const key of Object.keys(value)) {
          const word: Word = {
            id: key,
            ...value[key],
          };
          wordList.push(word);
        }
      });
    return wordList;
  };

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <MainLayout>
      <h1>Vocabulary Quiz Page</h1>
      <VocabularyQuizSelectModal
        show={showModal}
        fetchQuizWord={fetchQuizWord}
        fetchQuizMeaning={fetchQuizMeaning}
      />
      <VocabularyQuizItem
        show={!showModal}
        quizKind={quizKind}
        currentQuizNumber={currentQuizNumber}
        answersList={answersList}
        correctAnswerList={correctAnswerList}
      />
    </MainLayout>
  );
};

export default VocabularyQuizPage;
