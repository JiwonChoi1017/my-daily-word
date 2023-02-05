import React, { useContext, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordList from "@/components/vocabulary/word/VocabularyWordList";
import { useRouter } from "next/router";
import Link from "next/link";
import { BookContext } from "@/book/BookProvider";

const VocabularyWordListPage = () => {
  const router = useRouter();
  const { book } = useContext(BookContext);

  useEffect(() => {
    if (!router.isReady) return;
    console.log(router.query, book);
  });

  return (
    <MainLayout>
      <h1>Word List Page</h1>
      <VocabularyWordList />
      <Link href="/vocabulary/word/form">Add New Word</Link>
    </MainLayout>
  );
};

export default VocabularyWordListPage;
