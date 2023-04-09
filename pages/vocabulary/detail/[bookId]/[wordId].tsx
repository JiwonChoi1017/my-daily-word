import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";
import VocabularyWordDetail from "@/components/vocabulary/word/detail/VocabularyWordDetail";
import { get, ref, remove, update } from "firebase/database";
import { db } from "@/firebase-config";
import { v4 as uuidv4 } from "uuid";

/**
 * 単語詳細画面.
 *
 * @returns {JSX.Element} 単語詳細画面.
 */
const VocabularyWordDetailPage = () => {
  const router = useRouter();
  const { bookId, wordId } = router.query;
  const { currentUser } = useContext(AuthContext);
  // ローディング中か
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 単語状態
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
  // 暗記状態更新イベント
  const toggleMemorizedState = async (wordInfo: Word) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const { isMemorized } = wordInfo;
    const path = `users/${userId}/${bookId as string}/words/${wordInfo.id}`;
    const wordRef = ref(db, path);

    await update(wordRef, { isMemorized }).then(() => {
      setWord((prevState) => {
        const currentState = { ...prevState };
        currentState.isMemorized = isMemorized;
        return currentState;
      });
    });
    // TODO: 例外処理追加
  };
  // 単語削除イベント
  const deleteWord = async () => {
    if (!currentUser) return;

    const path = `users/${currentUser.uid}/${bookId as string}/words/${wordId}`;
    const wordRef = ref(db, path);

    await remove(wordRef).then(() => {
      router.push(`/vocabulary/list/${bookId}`);
    });
    // TODO: 例外処理追加
  };

  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const path = `users/${userId}/${bookId}/words/${wordId}`;
    const wordRef = ref(db, path);
    // 単語を取得
    const fetchWord = async () => {
      await get(wordRef)
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          if (!value) {
            setIsLoading(false);
            return;
          }
          setWord({ id: wordId, ...value });
          setIsLoading(false);
        });
    };
    fetchWord();
  }, [currentUser, bookId, wordId]);

  return (
    <MainLayout showQuiz={true} bookId={bookId as string}>
      <VocabularyWordDetail
        isLoading={isLoading}
        bookId={bookId as string}
        wordInfo={word}
        toggleMemorizedState={toggleMemorizedState}
        deleteWord={deleteWord}
      />
    </MainLayout>
  );
};

export default VocabularyWordDetailPage;
