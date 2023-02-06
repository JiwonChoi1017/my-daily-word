import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordList from "@/components/vocabulary/word/VocabularyWordList";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";

const VocabularyWordListPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [wordList, setWordList] = useState<Word[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${currentUser.uid}/${id}/words.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const wordList = [];
        for (const key in data) {
          const word = {
            id: key,
            ...data[key],
          };
          wordList.push(word);
        }

        setWordList(wordList);
      });
  }, [currentUser]);

  return (
    <MainLayout>
      <h1>Word List Page</h1>
      <Link href={`/vocabulary/word/form?book_id=${id}`}>Add New Word</Link>
      <VocabularyWordList wordList={wordList} />
    </MainLayout>
  );
};

export default VocabularyWordListPage;
