import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordForm from "@/components/vocabulary/word/form/VocabularyWordForm";
import { useRouter } from "next/router";
import { authService } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";

const VocabularyWordFormPage = () => {
  const router = useRouter();
  const bookId = router.query["book_id"];

  const onAddWordHandler = (wordInfo: Omit<Word, "id" | "modifiedAt">) => {
    const user = authService.currentUser;
    const api = user
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/users/${user.uid}/${bookId}/words.json`
      : "";

    fetch(api, {
      method: "POST",
      body: JSON.stringify(wordInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        router.push(`/vocabulary/list/${bookId}/?page=1`);
      })
      .catch();
  };

  return (
    <MainLayout>
      <h1>Vocabulary Word Form Page</h1>
      <VocabularyWordForm onAddWordHandler={onAddWordHandler} />
    </MainLayout>
  );
};

export default VocabularyWordFormPage;
