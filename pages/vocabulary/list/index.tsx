import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import VocabularyDocumentList from "@/components/vocabulary/list/document/VocabularyDocumentList";

const VocabularyDocumentListPage = () => {
  return (
    <MainLayout>
      <h1>Vocabulary Document List Page</h1>
      <Link href="/vocabulary/form/document">Add New Document</Link>
      <VocabularyDocumentList />
    </MainLayout>
  );
};

export default VocabularyDocumentListPage;
