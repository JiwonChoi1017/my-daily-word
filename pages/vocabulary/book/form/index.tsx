import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyBookForm from "@/components/vocabulary/book/form/VocabularyBookForm";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { ref, push } from "firebase/database";
import { GetServerSideProps } from "next";

/** Props. */
interface Props {
  /** (任意)遷移元. */
  referer?: string;
}

/**
 * 単語帳フォーム画面.
 *
 * @param referer - (任意)遷移元.
 * @returns {JSX.Element} 単語帳フォーム画面.
 */
const VocabularyBookFormPage = ({ referer }: Props) => {
  // キャンセルボタンの表示状態
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);
  // 現在のユーザ
  const { currentUser } = useContext(AuthContext);
  // ルーター
  const router = useRouter();

  useEffect(() => {
    const { location } = window;
    // 現在のURL
    const { href } = location;
    // 遷移元と現在のURLが一致しない場合、trueをセット
    setShowCancelButton(referer !== href);
  }, []);

  // 単語帳追加イベント
  const addBook = async (bookInfo: Omit<Book, "id" | "modifiedAt">) => {
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    const localStorageUuid = localStorage.getItem("uuid");
    const userId = currentUser?.uid ?? localStorageUuid;

    if (!userId) {
      return;
    }

    const userPath = `users/${userId}`;
    const userRef = ref(db, userPath);

    await push(userRef, bookInfo).then(() => {
      router.push("/vocabulary/list?page=1");
    });
  };
  // 前のページへ戻る
  const goBackPreviousPage = () => {
    router.back();
  };

  return (
    <MainLayout>
      <VocabularyBookForm
        addBook={addBook}
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

export default VocabularyBookFormPage;
