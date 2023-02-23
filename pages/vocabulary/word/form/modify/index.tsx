import VocabularyWordModifyForm from "@/components/vocabulary/word/form/modify/VocabularyWordModifyForm";
import { AuthContext } from "@/context/auth/AuthProvider";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import { get, ref, update } from "firebase/database";
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

  const updateWord = async (wordInfo: Word) => {
    if (!currentUser) return;

    const { word, pronunciation, meanings, modifiedAt } = wordInfo;
    const path = `users/${currentUser.uid}/${bookId as string}/words/${wordId}`;
    const wordRef = ref(db, path);

    await update(wordRef, { word, pronunciation, meanings, modifiedAt }).then(
      () => {
        router.push(`/vocabulary/detail/${bookId}/${wordId}`);
      }
    );
    // TODO: 例外処理追加
  };

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
      <VocabularyWordModifyForm wordInfo={word} updateWord={updateWord} />
    </div>
  );
};

export default VocabularyWordModifyFormPage;
