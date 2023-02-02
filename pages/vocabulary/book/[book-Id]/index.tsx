import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyItemList from "@/components/vocabulary/list/item/VocabularyItemList";
import { useRouter } from "next/router";
import Link from "next/link";

const VocabularyWordListPage = () => {
  const router = useRouter();
  // TODO: bookのidを取得し、データを取ってくるようにしたい
  console.log(router);

  return (
    <MainLayout>
      <h1>Word List Page</h1>
      <VocabularyItemList />
      <Link href="/vocabulary/word/form">Add New Word</Link>
    </MainLayout>
  );
};

export default VocabularyWordListPage;
