import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyBookForm from "@/components/vocabulary/book/form/VocabularyBookForm";
import { authService } from "@/firebase-config";
import { useRouter } from "next/router";

const VocabularyBookFormPage = () => {
  const router = useRouter();

  const onAddDocumentHandler = (documentInfo: {
    title: string;
    description: string;
    word: string;
    meaning: string;
  }) => {
    const user = authService.currentUser;
    const api = user
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${user.uid}.json`
      : "";

    fetch(api, {
      method: "POST",
      body: JSON.stringify(documentInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        router.push("/vocabulary/book");
      })
      .catch();
  };

  return (
    <MainLayout>
      <h1>Vocabulary Book Form Page</h1>
      <VocabularyBookForm onAddDocumentHandler={onAddDocumentHandler} />
    </MainLayout>
  );
};

export default VocabularyBookFormPage;
