import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyItemList from "@/components/vocabulary/list/item/VocabularyItemList";

const VocabularyItemListPage = () => {
  return (
    <MainLayout>
      <h1>Vocabulary Item List Page</h1>
      <VocabularyItemList />
    </MainLayout>
  );
};

export default VocabularyItemListPage;
