import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordModifyForm from "@/components/vocabulary/word/form/modify/VocabularyWordModifyForm";
import { AuthContext } from "@/context/auth/AuthProvider";
import { db } from "@/firebase-config";
import { Word } from "@/types/Vocabulary";
import { get, ref, update } from "firebase/database";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

// TODO: 単語追加フォームと共通化する予定のため、このファイルにはしばらく手をつけない
/**
 * 単語修正フォーム画面.
 *
 * @returns {JSX.Element} 単語修正フォーム画面.
 */
const VocabularyWordModifyFormPage = () => {
  // ルーター
  const router = useRouter();
  const bookId = router.query["book_id"] as string;
  const wordId = router.query["word_id"] as string;
  // 単語状態
  const [word, setWord] = useState<Word>({
    id: "",
    word: "",
    pronunciation: "",
    meanings: [{ meaning: "", examples: [] }],
    isMemorized: false,
    createdAt: "",
    modifiedAt: "",
  });
  // 現在のユーザーid
  const { currentUserId } = useContext(AuthContext);
  // 単語更新イベント
  const updateWord = async (wordInfo: Word) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const { word, pronunciation, meanings, modifiedAt } = wordInfo;
    const path = `users/${currentUserId}/${bookId as string}/words/${wordId}`;
    const wordRef = ref(db, path);

    await update(wordRef, { word, pronunciation, meanings, modifiedAt }).then(
      () => {
        router.push(`/vocabulary/detail/${bookId}/${wordId}`);
      }
    );
    // TODO: 例外処理追加
  };

  useEffect(() => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const path = `users/${currentUserId}/${bookId}/words/${wordId}`;
    const wordRef = ref(db, path);
    // 単語を取得
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
  }, [currentUserId, bookId, wordId]);

  return (
    <MainLayout showQuiz={true} showWordList={true} bookId={bookId}>
      <VocabularyWordModifyForm wordInfo={word} updateWord={updateWord} />
    </MainLayout>
  );
};

export default VocabularyWordModifyFormPage;
