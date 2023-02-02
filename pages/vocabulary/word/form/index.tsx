import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordForm from "@/components/vocabulary/word/form/VocabularyWordForm";

const VocabularyWordFormPage = () => {
  return (
    <MainLayout>
      <h1>Vocabulary Word Form Page</h1>
      <VocabularyWordForm />
    </MainLayout>
  );
};

export default VocabularyWordFormPage;
