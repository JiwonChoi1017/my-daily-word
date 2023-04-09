import Card from "@/components/ui/Card";
import Loader from "@/components/layout/Loader";
import { Word } from "@/types/Vocabulary";
import React from "react";
import { GoBackIcon, WordIcon } from "@/components/ui/Icon";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * 単語詳細.
 *
 * @param {boolean} isLoading - (任意)ローディング中か.
 * @param {string} bookId - 単語帳id.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} toggleMemorizedState - 暗記状態を更新.
 * @param {function} deleteWord - 単語を削除.
 * @returns {JSX.Element} 単語詳細.
 */
const VocabularyWordDetail: React.FC<{
  isLoading: boolean;
  bookId: string;
  wordInfo: Word;
  toggleMemorizedState: (wordInfo: Word) => void;
  deleteWord: () => void;
}> = ({ isLoading, bookId, wordInfo, toggleMemorizedState, deleteWord }) => {
  // 単語情報
  const { isMemorized, meanings } = wordInfo;
  // 暗記フラグクリックイベントハンドラ
  const onClickBookmarkIconHandler = () => {
    toggleMemorizedState({ ...wordInfo, isMemorized: !isMemorized });
  };
  // ルーター
  const router = useRouter();
  // 修正リンククリックイベントハンドラ
  const onClickModifyLinkHandler = () => {
    router.push(
      `/vocabulary/word/form/modify?book_id=${bookId}&word_id=${wordInfo.id}`
    );
  };
  // 削除リンククリックイベントハンドラ
  const onClickDeleteLinkHandler = () => {
    deleteWord();
  };
  // 前のページへ戻るリンク要素
  const goBackLinkElement = !isLoading && (
    <div className="alignItemsCenter">
      <GoBackIcon />
      <Link href={`/vocabulary/list/${bookId}?page=1`} className="link">
        単語リストへ戻る
      </Link>
    </div>
  );
  // 意味リスト
  const meaningList = meanings.map((meaning, index) => {
    return (
      <li key={`${meaning.meaning}_${index}`}>
        {index + 1}. {meaning.meaning}
        {meaning.examples && (
          <ul className="example">
            <span>例</span>
            {meaning.examples.map((example, index) => {
              return <li key={`${example}_${index}`}>{example}</li>;
            })}
          </ul>
        )}
      </li>
    );
  });

  return (
    <>
      {goBackLinkElement}
      <Card>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="title__wrap">
              <span className="title">{wordInfo.word}</span>
              <span>[{wordInfo.pronunciation}]</span>
            </div>
            {/* アイコン */}
            <WordIcon
              isMemorized={isMemorized}
              onClickBookmarkIconHandler={onClickBookmarkIconHandler}
              onClickModifyLinkHandler={onClickModifyLinkHandler}
              onClickDeleteLinkHandler={onClickDeleteLinkHandler}
            />
            <ul className="description">{meaningList}</ul>
          </div>
        )}
      </Card>
    </>
  );
};

export default VocabularyWordDetail;
