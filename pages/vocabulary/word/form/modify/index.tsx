import VocabularyWordModifyForm from "@/components/vocabulary/word/form/modify/VocabularyWordModifyForm";
import { AuthContext } from "@/context/auth/AuthProvider";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import { get, ref } from "firebase/database";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const VocabularyWordModifyFormPage = () => {
  const router = useRouter();
  const bookId = router.query["book_id"] as string;
  const wordId = router.query["word_id"] as string;

  const [word, setWord] = useState<Word>({
    id: "",
    word: "",
    pronunciation: "",
    meanings: [{ meaning: "", examples: [] }],
    isMemorized: false,
    createdAt: "",
    modifiedAt: "",
  });

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;

    const path = `users/${currentUser.uid}/${bookId}/words/${wordId}`;
    const wordRef = ref(db, path);

    const fetchWord = async () => {
      await get(wordRef)
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          setWord({
            id: wordId,
            ...value,
          });
        });
      // TODO: 例外処理追加
    };
    fetchWord();
  }, [currentUser, bookId, wordId]);

  return (
    <div>
      <VocabularyWordModifyForm wordInfo={word} />
    </div>
  );
};

export default VocabularyWordModifyFormPage;
