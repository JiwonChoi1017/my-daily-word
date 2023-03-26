import React, { useContext, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyQuizSelectModal from "@/components/vocabulary/quiz/VocabularyQuizSelectModal";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, ref, update } from "firebase/database";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import VocabularyQuizItem from "@/components/vocabulary/quiz/VocabularyQuizItem";
import { QUIZ_KIND, VOCABULARY_QUIZ_COUNT } from "@/constants/quizConstans";
import VocabularyQuizResult from "@/components/vocabulary/quiz/VocabularyQuizResult";
import { QuizKind } from "@/types/Quiz";

/**
 * クイズ画面.
 *
 * @returns {JSX.Element} クイズ画面.
 */
const VocabularyQuizPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [showModal, setShowModal] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizKind, setQuizKind] = useState<QuizKind>(QUIZ_KIND.word);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answersList, setAnswersList] = useState<string[][]>([]);
  const [correctAnswerList, setCorrectAnswerList] = useState<
    { id: string; word: string; meaning: string }[]
  >([]);

  const { currentUser } = useContext(AuthContext);

  const moveToWordListPage = () => {
    router.push(`/vocabulary/list/${id}/?page=1`);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

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
    setShowResult(false);
    setQuizKind(QUIZ_KIND.word);
    setAnswersList(answersList);
    setCorrectAnswerList(correctAnswerList);
    setShowModal(false);
  };

  const fetchQuizMeaning = async () => {
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
      tempAnswerList.push(meaning);
      correctAnswerList.push({ id, word, meaning });

      questionCount++;

      let answerCount = 0;
      while (answerCount < 3) {
        const randomWordIndex = Math.floor(Math.random() * wordList.length);
        if (answerIndexList.includes(randomWordIndex)) continue;
        const { meanings } = wordList[randomWordIndex];
        const randomMeaningIndex = Math.floor(Math.random() * meanings.length);
        const { meaning } = meanings[randomMeaningIndex];

        answerIndexList.push(randomWordIndex);
        tempAnswerList.push(meaning);

        answerCount++;
      }

      answersList.push(shuffleArray(tempAnswerList));
    }
    setShowResult(false);
    setQuizKind(QUIZ_KIND.meaning);
    setAnswersList(answersList);
    setCorrectAnswerList(correctAnswerList);
    setShowModal(false);
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

  const checkAnswer = async (answer: string) => {
    const correctAnswer = correctAnswerList[currentQuizIndex];
    const { word, meaning } = correctAnswer;

    if (!currentUser) return;

    const path = `users/${currentUser.uid}/${id}/words/${correctAnswer.id}`;
    const wordRef = ref(db, path);
    const isCorrect =
      quizKind === QUIZ_KIND.word ? answer === word : answer === meaning;

    await update(wordRef, { isMemorized: isCorrect }).then(() => {
      setTimeout(() => {
        if (currentQuizIndex < correctAnswerList.length - 1) {
          setCurrentQuizIndex((prevState) => {
            return prevState + 1;
          });
        } else {
          setShowResult(true);
        }
      }, 1000);
    });
  };

  return (
    <MainLayout>
      <VocabularyQuizSelectModal
        show={showModal}
        fetchQuizWord={fetchQuizWord}
        fetchQuizMeaning={fetchQuizMeaning}
      />
      <VocabularyQuizItem
        show={!showModal && !showResult}
        quizKind={quizKind}
        currentQuizIndex={currentQuizIndex}
        answersList={answersList}
        correctAnswerList={correctAnswerList}
        checkAnswer={checkAnswer}
      />
      <VocabularyQuizResult
        show={showResult}
        correctAnswerList={correctAnswerList}
        moveToWordListPage={moveToWordListPage}
        showModalHandler={showModalHandler}
      />
    </MainLayout>
  );
};

export default VocabularyQuizPage;
