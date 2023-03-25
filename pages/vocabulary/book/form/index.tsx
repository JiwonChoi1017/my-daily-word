import React, { useContext } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyBookForm from "@/components/vocabulary/book/form/VocabularyBookForm";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { ref, push } from "firebase/database";

/**
 * 単語帳フォーム画面.
 *
 * @returns {JSX.Element} 単語帳フォーム画面.
 */
const VocabularyBookFormPage = () => {
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);
  // ルーター
  const router = useRouter();
  // 単語帳追加イベントハンドラ
  const addBookHandler = async (bookInfo: Omit<Book, "id" | "modifiedAt">) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const userPath = `users/${userId}`;
    const userRef = ref(db, userPath);

    await push(userRef, bookInfo).then(() => {
      router.push("/vocabulary/list?page=1");
    });
  };

  return (
    <MainLayout>
      <VocabularyBookForm addBookHandler={addBookHandler} />
    </MainLayout>
  );
};

export default VocabularyBookFormPage;
