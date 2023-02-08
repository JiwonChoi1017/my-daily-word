import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordForm from "@/components/vocabulary/word/form/VocabularyWordForm";
import { useRouter } from "next/router";
import { authService } from "@/firebase-config";

const VocabularyWordFormPage = () => {
  const router = useRouter();
  const bookId = router.query["book_id"];

  const onAddWordHandler = (wordInfo: {
    word: string;
    meaning: string;
    pronunciation: string;
    examples: string[];
  }) => {
    const user = authService.currentUser;
    const api = user
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${user.uid}/${bookId}/words.json`
      : "";

    fetch(api, {
      method: "POST",
      body: JSON.stringify(wordInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        router.push(`/vocabulary/list/${bookId}`);
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
