import React, { useContext, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyQuizSelect from "@/components/vocabulary/quiz/VocabularyQuizSelect";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { get, ref, update } from "firebase/database";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import VocabularyQuizItem from "@/components/vocabulary/quiz/VocabularyQuizItem";
import { QUIZ_KIND, VOCABULARY_QUIZ_COUNT } from "@/constants/quizConstants";
import VocabularyQuizResult from "@/components/vocabulary/quiz/VocabularyQuizResult";
import { Answer, QuizKind } from "@/types/Quiz";
import { ErrorInfo } from "@/types/Error";
import { ERROR_STATUS } from "@/constants/constants";
import NotEnoughWord from "@/components/error/NotEnoughWord";
import { v4 as uuidv4 } from "uuid";

/**
 * クイズ画面.
 *
 * @returns {JSX.Element} クイズ画面.
 */
const VocabularyQuizPage = () => {
  // ルーター
  const router = useRouter();
  // 単語帳id
  const { id } = router.query;
  // エラー情報
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({
    status: ERROR_STATUS.SUCCESS,
    code: "",
    message: "",
  });
  const [showSelect, setShowSelect] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [quizKind, setQuizKind] = useState<QuizKind>(QUIZ_KIND.word);
  // 現在のクイズインデックス
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answersList, setAnswersList] = useState<string[][]>([]);
  // 正解リストの状態
  const [correctAnswerList, setCorrectAnswerList] = useState<Answer[]>([]);
  // 現在のユーザー
  const { currentUser } = useContext(AuthContext);

  const moveToWordListPage = () => {
    router.push(`/vocabulary/list/${id}/?page=1`);
  };
  // クイズセレクトを表示
  const showQuizSelect = () => {
    // クイズ結果を非表示
    setShowResult(false);
    // 現在のクイズインデックスを初期化
    setCurrentQuizIndex(0);
    // セレクトを表示
    setShowSelect(true);
  };
  // クイズ用の単語を取得
  const fetchQuizWord = async () => {
    const wordList = await fetchAllWords();
    // 単語の総件数が10件未満の場合
    if (!wordList || wordList.length < VOCABULARY_QUIZ_COUNT) {
      setErrorInfo({
        status: "error",
        code: ERROR_STATUS.NOT_ENOUGH_WORD,
        message: "クイズを解くには、10件以上の単語が必要となります。",
      });
      return;
    }
    // 問題インデックスリスト
    const questionIndexList: number[] = [];
    // 回答リスト
    const answersList: string[][] = [];
    // 正解リスト
    const correctAnswerList: Answer[] = [];

    let questionCount = 0;

    while (questionCount < VOCABULARY_QUIZ_COUNT) {
      const answerIndexList: number[] = [];
      const tempAnswerList = [];

      const randomWordIndex = Math.floor(Math.random() * wordList.length);
      if (questionIndexList.includes(randomWordIndex)) continue;
      const { id, word, pronunciation, meanings } = wordList[randomWordIndex];
      const randomMeaningIndex = Math.floor(Math.random() * meanings.length);
      const { meaning } = meanings[randomMeaningIndex];

      questionIndexList.push(randomWordIndex);
      answerIndexList.push(randomWordIndex);
      tempAnswerList.push(word);
      correctAnswerList.push({ id, word, pronunciation, meaning });

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
    setShowSelect(false);
  };

  // クイズ用の意味を取得
  const fetchQuizMeaning = async () => {
    const wordList = await fetchAllWords();
    // 単語の総件数が10件未満の場合
    if (!wordList || wordList.length < VOCABULARY_QUIZ_COUNT) {
      setErrorInfo({
        status: "error",
        code: ERROR_STATUS.NOT_ENOUGH_WORD,
        message: "クイズを解くには、10件以上の単語が必要となります。",
      });
      return;
    }

    const quizCount =
      wordList.length >= VOCABULARY_QUIZ_COUNT
        ? VOCABULARY_QUIZ_COUNT
        : wordList.length;
    // 問題インデックスリスト
    const questionIndexList: number[] = [];
    // 回答リスト
    const answersList: string[][] = [];
    // 正解リスト
    const correctAnswerList: Answer[] = [];

    let questionCount = 0;

    while (questionCount < quizCount) {
      const answerIndexList: number[] = [];
      const tempAnswerList = [];

      const randomWordIndex = Math.floor(Math.random() * wordList.length);
      if (questionIndexList.includes(randomWordIndex)) continue;
      const { id, word, pronunciation, meanings } = wordList[randomWordIndex];
      const randomMeaningIndex = Math.floor(Math.random() * meanings.length);
      const { meaning } = meanings[randomMeaningIndex];

      questionIndexList.push(randomWordIndex);
      answerIndexList.push(randomWordIndex);
      tempAnswerList.push(meaning);
      correctAnswerList.push({ id, word, pronunciation, meaning });

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
    setShowSelect(false);
  };
  // 全ての単語を取得
  const fetchAllWords = async () => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) return;

    const path = `users/${userId}/${id}/words`;
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

    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) return;

    const path = `users/${userId}/${id}/words/${correctAnswer.id}`;
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
    <MainLayout showQuiz={true} showWordList={true} bookId={id as string}>
      {errorInfo.code === ERROR_STATUS.NOT_ENOUGH_WORD ? (
        <NotEnoughWord errorInfo={errorInfo} bookId={id as string} />
      ) : (
        <>
          <VocabularyQuizSelect
            show={showSelect}
            fetchQuizWord={fetchQuizWord}
            fetchQuizMeaning={fetchQuizMeaning}
          />
          <VocabularyQuizItem
            show={!showSelect && !showResult}
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
            showQuizSelect={showQuizSelect}
          />
        </>
      )}
    </MainLayout>
  );
};

export default VocabularyQuizPage;
