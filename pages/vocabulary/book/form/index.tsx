import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VocabularyBookForm from "@/components/vocabulary/book/form/VocabularyBookForm";
import { db } from "@/firebase-config";
import { useRouter } from "next/router";
import { Book } from "@/types/Vocabulary";
import { AuthContext } from "@/context/auth/AuthProvider";
import { ref, push, get, update } from "firebase/database";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

/** Props. */
interface Props {
  /** (任意)遷移元. */
  referer?: string;
  /** (任意)クエリ. */
  query?: ParsedUrlQuery;
}

/**
 * 単語帳フォーム画面.
 *
 * @param referer - (任意)遷移元.
 * @param query - (任意)クエリ.
 * @returns {JSX.Element} 単語帳フォーム画面.
 */
const VocabularyBookFormPage = ({ referer, query }: Props) => {
  // 単語帳id
  const [bookId, setBookId] = useState<string>("");
  // 単語帳
  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    word: "",
    meaning: "",
    description: "",
    createdAt: "",
    modifiedAt: "",
    isFavorite: false,
  });
  // キャンセルボタンの表示状態
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);
  // 現在のユーザーid
  const { currentUserId } = useContext(AuthContext);
  // ルーター
  const router = useRouter();

  useEffect(() => {
    if (!referer) {
      return;
    }
    // 現在のURL
    const { origin, pathname } = location;
    const currentUrl = `${origin}${pathname}`;
    // 遷移元と現在のURLが一致しない場合、trueをセット
    setShowCancelButton(referer !== currentUrl);

    if (!query) {
      return;
    }
    // クエリから単語帳idを取得
    const { bookId } = query;

    if (!bookId || typeof bookId !== "string") {
      return;
    }

    setBookId(bookId);

    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const path = `users/${currentUserId}/${bookId}`;
    const bookRef = ref(db, path);
    // 単語帳を取得
    const fetchBook = async () => {
      await get(bookRef)
        .then((response) => {
          return response.val();
        })
        .then((value) => {
          setBook({
            id: bookId,
            ...value,
          });
        });
      // TODO: 例外処理追加
    };
    fetchBook();
  }, [currentUserId]);

  // 単語帳追加イベント
  const addBook = async (bookInfo: Omit<Book, "id" | "modifiedAt">) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const userPath = `users/${currentUserId}`;
    const userRef = ref(db, userPath);

    await push(userRef, bookInfo).then(() => {
      router.push("/vocabulary/list?page=1");
    });
  };
  // 単語更新イベント
  const updateBook = async (bookInfo: Book) => {
    // idが存在しない場合、早期リターン
    if (!currentUserId) {
      return;
    }

    const { title, description, word, meaning, modifiedAt } = bookInfo;
    const path = `users/${currentUserId}/${bookId}`;
    const bookRef = ref(db, path);

    await update(bookRef, {
      title,
      description,
      word,
      meaning,
      modifiedAt,
    }).then(() => {
      router.push("/vocabulary/list?page=1");
    });
    // TODO: 例外処理追加
  };
  // 前のページへ戻る
  const goBackPreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <MainLayout>
      <VocabularyBookForm
        isModifyForm={!!bookId}
        bookInfo={book}
        addBook={addBook}
        updateBook={updateBook}
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
  const query = context.query;

  return { props: { referer, query } };
};

export default VocabularyBookFormPage;
