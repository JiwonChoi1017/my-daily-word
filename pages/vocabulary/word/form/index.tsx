import React, { useContext } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordForm from "@/components/vocabulary/word/form/VocabularyWordForm";
import { useRouter } from "next/router";
import { Word } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { push, ref } from "firebase/database";
import { db } from "@/firebase-config";

/**
 * 単語フォーム画面.
 *
 * @returns {JSX.Element} 単語フォーム画面.
 */
const VocabularyWordFormPage = () => {
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);
  // ルーター
  const router = useRouter();
  // 単語帳id
  const bookId = router.query["book_id"];
  // 単語追加イベント
  const addWord = async (wordInfo: Omit<Word, "id" | "modifiedAt">) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const wordPath = `users/${userId}/${bookId}/words`;
    const userRef = ref(db, wordPath);

    await push(userRef, wordInfo)
      .then(() => {
        router.push(`/vocabulary/list/${bookId}/?page=1`);
      })
      .catch();
  };

  return (
    <MainLayout showQuiz={true} bookId={bookId as string}>
      <VocabularyWordForm addWord={addWord} />
    </MainLayout>
  );
};

export default VocabularyWordFormPage;
