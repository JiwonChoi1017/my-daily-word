import Card from "@/components/ui/Card";
import Examples from "./Examples";
import GoBackLink from "./GoBackLink";
import Loader from "@/components/layout/Loader";
import React from "react";
import Title from "@/components/ui/Title";
import { Word } from "@/types/Vocabulary";
import { WordIcon } from "@/components/icon/Icon";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** ローディング中か. */
  isLoading: boolean;
  /** 単語帳id. */
  bookId: string;
  /** 単語情報. */
  wordInfo: Word;
  /** 暗記状態を更新. */
  toggleMemorizedState: (wordInfo: Word) => void;
  /** 単語を削除. */
  deleteWord: () => void;
}

/**
 * 単語詳細.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語詳細.
 */
const VocabularyWordDetail = ({
  isLoading,
  bookId,
  wordInfo,
  toggleMemorizedState,
  deleteWord,
}: Props) => {
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
    router.push(`/vocabulary/word/form?bookId=${bookId}&wordId=${wordInfo.id}`);
  };
  // 削除リンククリックイベントハンドラ
  const onClickDeleteLinkHandler = () => {
    deleteWord();
  };
  // 意味リスト
  const meaningList = meanings.map((meaning, index) => {
    return (
      <li key={`${meaning.meaning}_${index}`}>
        {index + 1}. {meaning.meaning}
        <Examples examples={meaning.examples} />
      </li>
    );
  });

  return (
    <>
      {/* 一覧画面へ戻るリンク */}
      <GoBackLink
        isLoading={isLoading}
        url={`/vocabulary/list/${bookId}?page=1`}
      />
      <Card needToChangeCursorToDefault={true}>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {/* タイトル */}
            <Title
              title={wordInfo.words.join(" / ")}
              subtitle={`【${wordInfo.pronunciations.join(" / ")}】`}
            />
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
