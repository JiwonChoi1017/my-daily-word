import { BookmarkIcon, WordIcon } from "@/components/icon/Icon";

import Card from "@/components/ui/Card";
import Loader from "@/components/layout/Loader";
import React from "react";
import { Word } from "@/types/Vocabulary";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** (任意)ローディング中か. */
  isLoading?: boolean;
  /** (任意)ドロップダウンアイコンを表示するか. */
  showDropDownIcon?: boolean;
  /** 単語帳id. */
  bookId: string;
  /** 単語情報. */
  wordInfo: Word;
  /** 暗記状態を更新. */
  toggleMemorizedState: (wordInfo: Word) => void;
  /** (任意)単語削除イベントハンドラ. */
  deleteWordHandler?: (wordId: string) => void;
}

/**
 * 単語.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語.
 */
const VocabularyWord = ({
  isLoading,
  showDropDownIcon = false,
  bookId,
  wordInfo,
  toggleMemorizedState,
  deleteWordHandler,
}: Props) => {
  const { id, words, pronunciations, isMemorized, meanings } = wordInfo;
  // ルーター
  const router = useRouter();
  // 詳細ページへ移動
  const moveToDetailPage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // MEMO: event.target と event.currentTarget の違い
    // event.target: イベントが発生した要素を表す.
    // event.currentTarget: イベントハンドラが登録された要素を表す.
    const target = e.target as HTMLElement;
    if (target.closest("._ignoreClick")) return;

    router.push(`/vocabulary/detail/${bookId}/${id}`);
  };
  // 暗記フラグクリックイベントハンドラ
  const onClickBookmarkIconHandler = () => {
    toggleMemorizedState({ ...wordInfo, isMemorized: !isMemorized });
  };
  // 修正リンククリックイベントハンドラ
  const onClickModifyLinkHandler = () => {
    router.push(`/vocabulary/word/form?bookId=${bookId}&wordId=${wordInfo.id}`);
  };
  // 削除リンククリックイベントハンドラ
  const onClickDeleteLinkHandler = () => {
    if (!deleteWordHandler) {
      return;
    }
    deleteWordHandler(wordInfo.id);
  };
  // 意味リスト
  const meaningList = meanings.map((meaning, index) => {
    return (
      <li key={`${meaning}_${index}`}>
        {index + 1}. {meaning.meaning}
      </li>
    );
  });

  return (
    <Card clickHandler={moveToDetailPage}>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          id={id}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            moveToDetailPage(e);
          }}
        >
          <div className="title__wrap">
            <span className="title">{words.join(" / ")}</span>
            <span>[{pronunciations.join(" / ")}]</span>
          </div>
          {/* アイコン */}
          <div className="floatRight _ignoreClick">
            {showDropDownIcon ? (
              <WordIcon
                isMemorized={isMemorized}
                onClickBookmarkIconHandler={onClickBookmarkIconHandler}
                onClickModifyLinkHandler={onClickModifyLinkHandler}
                onClickDeleteLinkHandler={onClickDeleteLinkHandler}
              />
            ) : (
              <BookmarkIcon
                isMemorized={isMemorized}
                onClickBookmarkIconHandler={onClickBookmarkIconHandler}
              />
            )}
          </div>
          <ul className="description">{meaningList}</ul>
        </div>
      )}
    </Card>
  );
};

export default VocabularyWord;
