import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { AuthContext } from "@/context/auth/AuthProvider";
import {
  get,
  limitToFirst,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";

export default function Home() {
  const [randomWord, setRandomWord] = useState<Word>({
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

    // TODO: words有無チェック
    const fetchRandomWord = async () => {
      const booksPath = `users/${currentUser.uid}`;
      const booksRef = ref(db, booksPath);

      const bookId = await get(
        query(booksRef, orderByChild("isFavorite"), limitToLast(1))
      )
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          return Object.keys(value)[0];
        });

      const wordsPath = `users/${currentUser.uid}/${bookId}/words`;
      const wordsRef = ref(db, wordsPath);

      await get(query(wordsRef, orderByChild("isMemorized"), limitToFirst(10)))
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          const wordList: Word[] = [];
          for (const key of Object.keys(value)) {
            const word: Word = {
              id: key,
              ...value[key],
            };
            wordList.push(word);
          }
          const randomIndex = Math.floor(Math.random() * wordList.length);
          setRandomWord(wordList[randomIndex]);
        });
    };

    fetchRandomWord();
  }, [currentUser]);

  return (
    <MainLayout>
      <Link href="/vocabulary/list?page=1">Start!</Link>
    </MainLayout>
  );
}
