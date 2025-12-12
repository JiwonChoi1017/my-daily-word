import { AddIcon } from "@/components/icon/Icon";
import { Book } from "@/types/Vocabulary";
import Loader from "@/components/layout/Loader";
import NotFoundList from "@/components/error/NotFoundList";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import VocabularyBook from "./VocabularyBook";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** 現在のページ. */
  currentPage: number;
  /** 次に読み込むデータが存在するか. */
  hasMore: boolean;
  /** 単語帳リスト. */
  bookList: Book[];
  /** ローディング中か. */
  isLoading: boolean;
  /** 単語帳データを取得. */
  fetchBookList: (currentPage: number) => void;
  /** お気に入り状態更新イベント. */
  toggleFavoriteState: (bookInfo: Book) => void;
  /** 単語帳削除イベントハンドラ. */
  deleteBookHandler: (bookId: string) => void;
}

/**
 * 単語帳リスト.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語帳リスト.
 */
const VocabularyBookList = ({
  currentPage,
  hasMore,
  bookList,
  isLoading,
  fetchBookList,
  toggleFavoriteState,
  deleteBookHandler,
}: Props) => {
  // ルーター
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      fetchBookList(Math.floor(bookList.length / VOCABULARY_LIST_RESULTS) + 1);
    }
  }, [inView, hasMore, isLoading]);

  // 単語帳フォームに遷移
  const moveToVocabularyBookForm = () => {
    router.push("/vocabulary/book/form");
  };
  // 単語帳リスト要素
  const bookListElement = (
    <>
      <div className="marginTop20">
        <AddIcon onClickAddIconHandler={moveToVocabularyBookForm} />
      </div>
      {isLoading ? (
        <Loader />
      ) : !bookList.length ? (
        <NotFoundList />
      ) : (
        <>
          {bookList.map((book, index) => {
            const hasMoreItem = hasMore && index === bookList.length - 1;
            return (
              <div key={book.id} ref={hasMoreItem ? ref : null}>
                <VocabularyBook
                  key={book.id}
                  bookInfo={book}
                  toggleFavoriteState={toggleFavoriteState}
                  deleteBookHandler={deleteBookHandler}
                />
              </div>
            );
          })}
          <ScrollToTopButton />
        </>
      )}
    </>
  );
  return bookListElement;
};

export default VocabularyBookList;
