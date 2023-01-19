import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyDocumentForm from "@/components/vocabulary/form/document/VocabularyDocumentForm";

const VocabularyDocumentFormPage = () => {
  return (
    <MainLayout>
      <h1>Vocabulary Document Form Page</h1>
      <VocabularyDocumentForm />
    </MainLayout>
  );
};

export default VocabularyDocumentFormPage;
