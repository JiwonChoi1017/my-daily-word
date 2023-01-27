import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyDocumentForm from "@/components/vocabulary/form/document/VocabularyDocumentForm";
import { authService } from "@/firebase-config";
import { useRouter } from "next/router";

const VocabularyDocumentFormPage = () => {
  const router = useRouter();

  const onAddDocumentHandler = (documentInfo: {
    title: string;
    description: string;
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
        router.push("/vocabulary/list");
      })
      .catch();
  };

  return (
    <MainLayout>
      <h1>Vocabulary Document Form Page</h1>
      <VocabularyDocumentForm onAddDocumentHandler={onAddDocumentHandler} />
    </MainLayout>
  );
};

export default VocabularyDocumentFormPage;
