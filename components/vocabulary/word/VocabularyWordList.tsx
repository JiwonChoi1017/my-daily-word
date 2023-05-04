import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import VocabularyWord from "./VocabularyWord";
import NotFoundWord from "@/components/error/NotFoundWord";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import InfiniteScroll from "react-infinite-scroller";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import { AddIcon } from "@/components/icon/Icon";

/**
 * 単語リスト.
 *
 * @param {number} currentPage - 現在のページ.
 * @param {boolean} hasMore - 次に読み込むデータが存在するか.
 * @param {string} bookId - 単語帳id.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} filterWordList - 単語リストをフィルター.
 * @param {boolean} isLoading - ローディング中か.
 * @param {function} fetchWordList - 単語データを取得.
 * @param {function} toggleMemorizedState - 暗記状態を更新.
 * @returns {JSX.Element} 単語リスト.
 */
const VocabularyWordList: React.FC<{
  currentPage: number;
  hasMore: boolean;
  bookId: string;
  wordList: Word[];
  filterWordList: (keyword: string) => void;
  isLoading: boolean;
  fetchWordList: (currentPage: number) => void;
  toggleMemorizedState: (wordInfo: Word) => void;
}> = ({
  currentPage,
  hasMore,
  bookId,
  wordList,
  filterWordList,
  isLoading,
  fetchWordList,
  toggleMemorizedState,
}) => {
  // ルーター
  const router = useRouter();
  // キーワードのref
  const keywordRef = useRef<HTMLInputElement>(null);
  // キーワード変更イベントハンドラ
  const onChangeKeywordHandler = () => {
    if (!keywordRef.current) return;

    const keywordValue = keywordRef.current.value;
    filterWordList(keywordValue);
  };
  // 単語フォームに遷移
  const moveToVocabularyWordForm = () => {
    router.push(`/vocabulary/word/form?bookId=${bookId}`);
  };
  // 検索窓
  const searchBox = (
    <input ref={keywordRef} type="text" onChange={onChangeKeywordHandler} />
  );
  // 単語追加アイコン
  const addWordIcon = (
    <AddIcon onClickAddIconHandler={moveToVocabularyWordForm} />
  );
  const wordTopModule = (
    <div className="wordTopModule">
      {searchBox}
      {addWordIcon}
    </div>
  );
  // 単語リスト要素
  const wordListElement = (
    <>
      {wordTopModule}
      {isLoading ? (
        <Loader />
      ) : !wordList.length ? (
        <NotFoundWord />
      ) : (
        <InfiniteScroll
          className="marginTop30"
          pageStart={currentPage}
          loadMore={() => {
            fetchWordList(
              Math.floor(wordList.length / VOCABULARY_LIST_RESULTS) +
                (wordList.length % 2)
            );
          }}
          loader={<Loader key={currentPage} />}
          hasMore={hasMore}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          scrollabletarget="scrollableDiv"
        >
          {wordList.map((word, index) => {
            return (
              <div key={word.id}>
                <VocabularyWord
                  key={word.id}
                  bookId={bookId}
                  wordInfo={word}
                  toggleMemorizedState={toggleMemorizedState}
                />
                {hasMore && index === wordList.length - 1 && (
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
  return wordListElement;
};

export default VocabularyWordList;
