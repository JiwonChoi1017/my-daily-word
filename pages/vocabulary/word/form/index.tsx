import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyWordForm from "@/components/vocabulary/word/form/VocabularyWordForm";
import { useRouter } from "next/router";
import { Word } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { push, ref } from "firebase/database";
import { db } from "@/firebase-config";
import { GetServerSideProps } from "next";

/** Props. */
interface Props {
  /** (任意)遷移元. */
  referer?: string;
}

/**
 * 単語フォーム画面.
 *
 * @param referer - (任意)遷移元.
 * @returns {JSX.Element} 単語フォーム画面.
 */
const VocabularyWordFormPage = ({ referer }: Props) => {
  // キャンセルボタンの表示状態
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);
  // ルーター
  const router = useRouter();
  // 単語帳id
  const bookId = router.query["book_id"];

  useEffect(() => {
    const { location } = window;
    // 現在のURL
    const { href } = location;
    // 遷移元と現在のURLが一致しない場合、trueをセット
    setShowCancelButton(referer !== href);
  }, []);

  // 単語追加イベント
  const addWord = async (wordInfo: Omit<Word, "id" | "modifiedAt">) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const wordPath = `users/${userId}/${bookId}/words`;
    const userRef = ref(db, wordPath);

    await push(userRef, wordInfo)
      .then(() => {
        router.push(`/vocabulary/list/${bookId}/?page=1`);
      })
      .catch();
  };
  // 前のページへ戻る
  const goBackPreviousPage = () => {
    router.back();
  };

  return (
    <MainLayout showQuiz={true} showWordList={true} bookId={bookId as string}>
      <VocabularyWordForm
        addWord={addWord}
        showCancelButton={showCancelButton}
        onClickCancelButton={goBackPreviousPage}
      />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context) {
    return { props: {} };
  }
  // contextから遷移元の情報を取得
  const referer = context.req.headers.referer;

  return { props: { referer } };
};

export default VocabularyWordFormPage;
