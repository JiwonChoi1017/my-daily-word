import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordModifyForm from "@/components/vocabulary/word/form/modify/VocabularyWordModifyForm";
import { AuthContext } from "@/context/auth/AuthProvider";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import { get, ref, update } from "firebase/database";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * 単語修正フォーム画面.
 *
 * @returns {JSX.Element} 単語修正フォーム画面.
 */
const VocabularyWordModifyFormPage = () => {
  // ルーター
  const router = useRouter();
  const bookId = router.query["book_id"] as string;
  const wordId = router.query["word_id"] as string;
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
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);
  // 単語更新イベント
  const updateWord = async (wordInfo: Word) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const { word, pronunciation, meanings, modifiedAt } = wordInfo;
    const path = `users/${userId}/${bookId as string}/words/${wordId}`;
    const wordRef = ref(db, path);

    await update(wordRef, { word, pronunciation, meanings, modifiedAt }).then(
      () => {
        router.push(`/vocabulary/detail/${bookId}/${wordId}`);
      }
    );
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
          setWord({
            id: wordId,
            ...value,
          });
        });
      // TODO: 例外処理追加
    };
    fetchWord();
  }, [currentUser, bookId, wordId]);

  return (
    <MainLayout showQuiz={true} bookId={bookId}>
      <VocabularyWordModifyForm wordInfo={word} updateWord={updateWord} />
    </MainLayout>
  );
};

export default VocabularyWordModifyFormPage;
