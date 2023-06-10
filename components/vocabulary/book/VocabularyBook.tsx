import { Book } from "@/types/Vocabulary";
import { BookIcon } from "@/components/icon/Icon";
import Card from "@/components/ui/Card";
import { LANGUAGES } from "@/constants/constants";
import React from "react";
import Title from "@/components/ui/Title";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** 単語帳情報. */
  bookInfo: Book;
  /** お気に入り状態更新イベント. */
  toggleFavoriteState: (bookInfo: Book) => void;
}

/**
 * 単語帳.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語帳.
 */
const VocabularyBook = ({ bookInfo, toggleFavoriteState }: Props) => {
  const { id, title, entry, body, description, isFavorite } = bookInfo;
  // ルーター
  const router = useRouter();
  // 単語帳クリックイベント
  const clickBookHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("._ignoreClick")) return;

    router.push(`/vocabulary/list/${id}/?page=1`);
  };
  // お気に入りアイコンクリックイベントハンドラ
  const onClickFavoriteIconHandler = () => {
    toggleFavoriteState({ ...bookInfo, isFavorite: !isFavorite });
  };
  // 単語帳修正フォームへ遷移
  const moveToBookModifyForm = () => {
    router.push({
      pathname: "/vocabulary/book/form/",
      query: { bookId: id },
    });
  };
  // 見出し語の言語
  const entryLanguage =
    Object.values(LANGUAGES).find((language) => {
      return language.value === entry;
    })?.label ?? "";
  // 本文の言語
  const bodyLanguage =
    Object.values(LANGUAGES).find((language) => {
      return language.value === body;
    })?.label ?? "";

  return (
    <Card clickHandler={clickBookHandler}>
      <div
        id={id}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          clickBookHandler(e);
        }}
      >
        <Title
          title={title}
          subtitle={`【${entryLanguage} → ${bodyLanguage}】`}
        />
        <BookIcon
          isFavorite={isFavorite}
          onClickFavoriteIconHandler={onClickFavoriteIconHandler}
          onClickModifyLinkHandler={moveToBookModifyForm}
          // TODO: 削除機能も実装
          onClickDeleteLinkHandler={() => {
            return;
          }}
        />
        <p className="description">{description}</p>
      </div>
    </Card>
  );
};

export default VocabularyBook;
