import Loader from "@/components/layout/Loader";
import { Book } from "@/types/Vocabulary";
import React from "react";
import VocabularyBook from "./VocabularyBook";
import { useRouter } from "next/router";
import NotFoundList from "@/components/error/NotFoundList";
import InfiniteScroll from "react-infinite-scroller";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import { AddIcon } from "@/components/icon/Icon";

/**
 * 単語帳リスト.
 *
 * @param {number} currentPage - 現在のページ.
 * @param {boolean} hasMore - 次に読み込むデータが存在するか.
 * @param {Book[]} bookList - 単語帳リスト.
 * @param {boolean} isLoading - ローディング中か.
 * @param {function} fetchBookList - 単語帳データを取得.
 * @param {function} toggleFavoriteState - お気に入り状態更新イベント.
 * @returns {JSX.Element} 単語帳リスト.
 */
const VocabularyBookList: React.FC<{
  currentPage: number;
  hasMore: boolean;
  bookList: Book[];
  isLoading: boolean;
  fetchBookList: (currentPage: number) => void;
  toggleFavoriteState: (bookInfo: Book) => void;
}> = ({
  currentPage,
  hasMore,
  bookList,
  isLoading,
  fetchBookList,
  toggleFavoriteState,
}) => {
  // ルーター
  const router = useRouter();
  // 単語帳フォームに遷移
  const moveToVocabularyBookForm = () => {
    router.push("/vocabulary/book/form");
  };
  // 単語帳追加アイコン
  const addBookIcon = (
    <AddIcon onClickAddIconHandler={moveToVocabularyBookForm} />
  );
  // 単語帳リスト要素
  const bookListElement = (
    <>
      {addBookIcon}
      {isLoading ? (
        <Loader />
      ) : !bookList.length ? (
        <NotFoundList />
      ) : (
        <InfiniteScroll
          pageStart={currentPage}
          loadMore={() => {
            fetchBookList(
              Math.floor(bookList.length / VOCABULARY_LIST_RESULTS) + 1
            );
          }}
          loader={<Loader key={currentPage} />}
          hasMore={hasMore}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          scrollabletarget="scrollableDiv"
        >
          {bookList.map((book, index) => {
            return (
              <div key={book.id}>
                <VocabularyBook
                  key={book.id}
                  bookInfo={book}
                  toggleFavoriteState={toggleFavoriteState}
                />
                {hasMore && index === bookList.length - 1 && (
                  <div id="scrollableDiv" />
                )}
              </div>
            );
          })}
          <ScrollToTopButton />
        </InfiniteScroll>
      )}
    </>
  );
  return bookListElement;
};

export default VocabularyBookList;
