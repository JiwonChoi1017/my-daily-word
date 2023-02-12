import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth/AuthProvider";
import { Word } from "@/types/Vocabulary";
import VocabularyWordDetail from "@/components/vocabulary/word/detail/VocabularyWordDetail";

const VocabularyWordDetailPage = () => {
  const router = useRouter();
  const { bookId, wordId } = router.query;
  const { currentUser } = useContext(AuthContext);
  const [word, setWord] = useState<Word>({
    id: "",
    word: "",
    pronunciation: "",
    meanings: [{ meaning: "", examples: [] }],
    isFavorite: false,
    isMemorized: false,
  });

  useEffect(() => {
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${currentUser.uid}/${bookId}/words/${wordId}.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWord({ id: wordId, ...data });
      });
  }, []);

  return (
    <MainLayout>
      <h1>Vocabulary Detail Page</h1>
      <VocabularyWordDetail word={word} />
    </MainLayout>
  );
};

export default VocabularyWordDetailPage;
