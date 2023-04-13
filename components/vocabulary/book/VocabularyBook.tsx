import React from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import { Book } from "@/types/Vocabulary";
import { BookIcon } from "@/components/ui/Icon";

/**
 * 単語帳.
 *
 * @param {string} bookInfo - 単語帳情報.
 * @param {function} toggleFavoriteState - お気に入り状態更新イベント.
 * @returns {JSX.Element} 単語帳.
 */
const VocabularyBook: React.FC<{
  bookInfo: Book;
  toggleFavoriteState: (bookInfo: Book) => void;
}> = ({ bookInfo, toggleFavoriteState }) => {
  const { id, title, description, isFavorite } = bookInfo;
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

  return (
    <Card clickHandler={clickBookHandler}>
      <div
        id={id}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          clickBookHandler(e);
        }}
      >
        <div className="title__wrap">
          <span className="title">{title}</span>
        </div>
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
