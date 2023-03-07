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
  update,
} from "firebase/database";
import { db } from "@/firebase-config";
import { Book, Word } from "@/types/Vocabulary";
import VocabularyWord from "@/components/vocabulary/word/VocabularyWord";

export default function Home() {
  const [bookId, setBookId] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
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
          const firstBookKey = Object.keys(value)[0];
          const firstBook: Book = value[firstBookKey];
          setBookTitle(firstBook.title);
          return firstBookKey;
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

      setBookId(bookId);
    };

    fetchRandomWord();
  }, [currentUser]);

  const toggleMemorizedState = async (wordInfo: Word) => {
    if (!currentUser) return;

    const { isMemorized } = wordInfo;
    const path = `users/${currentUser.uid}/${bookId}/words/${wordInfo.id}`;
    const wordRef = ref(db, path);

    await update(wordRef, { isMemorized }).then(() => {
      setRandomWord((prevState: Word) => {
        const currentState = { ...prevState };
        currentState.isMemorized = isMemorized;
        return currentState;
      });
    });
  };

  return (
    <MainLayout>
      <ul>
        <VocabularyWord
          bookId={bookId}
          wordInfo={randomWord}
          toggleMemorizedState={toggleMemorizedState}
        />
      </ul>
      <Link href={`/vocabulary/list/${bookId}?page=1`}>
        {bookTitle}単語帳へ
      </Link>
      <Link href="/vocabulary/list?page=1">単語帳リストへ</Link>
    </MainLayout>
  );
}
