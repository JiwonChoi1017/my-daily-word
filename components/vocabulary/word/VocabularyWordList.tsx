import React, { useRef } from "react";

import { AddIcon } from "@/components/icon/Icon";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "@/components/layout/Loader";
import NotFoundWord from "@/components/error/NotFoundWord";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import SearchBox from "@/components/ui/SearchBox";
import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import VocabularyWord from "./VocabularyWord";
import { Word } from "@/types/Vocabulary";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** 現在のページ. */
  currentPage: number;
  /** キーワードに一致する単語が見つかったか. */
  isFoundFilteredWord: boolean;
  /** 次に読み込むデータが存在するか. */
  hasMore: boolean;
  /** 単語帳id. */
  bookId: string;
  /** 単語情報. */
  wordList: Word[];
  /** 単語リストをフィルター. */
  filterWordList: (keyword: string) => void;
  /** ローディング中か. */
  isLoading: boolean;
  /** 単語データを取得. */
  fetchWordList: (currentPage: number) => void;
  /** 暗記状態を更新. */
  toggleMemorizedState: (wordInfo: Word) => void;
  /** 単語削除イベントハンドラ. */
  deleteWordHandler: (wordId: string) => void;
}

/**
 * 単語リスト.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語リスト.
 */
const VocabularyWordList = ({
  currentPage,
  isFoundFilteredWord,
  hasMore,
  bookId,
  wordList,
  filterWordList,
  isLoading,
  fetchWordList,
  toggleMemorizedState,
  deleteWordHandler,
}: Props) => {
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
  // 単語追加アイコン
  const addWordIcon = (
    <AddIcon onClickAddIconHandler={moveToVocabularyWordForm} />
  );
  // 単語関連の上部モジュール
  const wordTopModule = (
    <div className="wordTopModule">
      <SearchBox
        keywordRef={keywordRef}
        onChangeHandler={onChangeKeywordHandler}
      />
      {addWordIcon}
    </div>
  );
  // 単語リストを生成
  const createWordList = () => {
    // キーワード検索結果が0件
    if (!isFoundFilteredWord) {
      return (
        <NotFoundWord
          message={`${keywordRef.current?.value}に一致する単語が見つかりませんでした。
      <br />
      キーワードを変えて検索してみてください。`}
        />
      );
    }
    // 初期表示時の検索結果が0件
    if (!wordList.length) {
      return (
        <NotFoundWord
          message="単語が見つかりませんでした。
      <br />
      新しい単語を追加してください。"
        />
      );
    }

    return (
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
                showDropDownIcon={true}
                bookId={bookId}
                wordInfo={word}
                toggleMemorizedState={toggleMemorizedState}
                deleteWordHandler={deleteWordHandler}
              />
              {hasMore && index === wordList.length - 1 && (
                <div id="scrollableDiv" />
              )}
            </div>
          );
        })}
        <ScrollToTopButton />
      </InfiniteScroll>
    );
  };

  return (
    <>
      {wordTopModule}
      {isLoading ? <Loader /> : createWordList()}
    </>
  );
};

export default VocabularyWordList;
