import { AiFillDelete, AiOutlineMore } from "react-icons/ai";
import {
  FaAngleLeft,
  FaBookmark,
  FaCheck,
  FaHeart,
  FaPen,
  FaPlus,
  FaRegBookmark,
  FaRegHeart,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import React, { useState } from "react";

import classes from "../../styles/Icon.module.css";

/**
 * お気に入りアイコン.
 *
 * @param {boolean} isFavorite - お気に入りか.
 * @param {function} onClickFavoriteIconHandler - お気に入りアイコンクリックイベントハンドラ.
 * @returns {JSX.Element} お気に入りアイコン.
 */
export const FavoriteIcon: React.FC<{
  isFavorite: boolean;
  onClickFavoriteIconHandler: () => void;
}> = ({ isFavorite, onClickFavoriteIconHandler }) => {
  return isFavorite ? (
    <FaHeart
      className={classes.favoriteIcon}
      onClick={onClickFavoriteIconHandler}
    />
  ) : (
    <FaRegHeart
      className={classes.favoriteIcon}
      onClick={onClickFavoriteIconHandler}
    />
  );
};

/**
 * 検索アイコン.
 *
 * @returns {JSX.Element} 検索アイコン.
 */
export const SearchIcon = () => {
  return <FaSearch className={classes.searchIcon} />;
};

/**
 * 暗記フラグ.
 *
 * @param {boolean} isMemorized - 暗記済みか.
 * @param {function} onClickBookmarkIconHandler - 暗記フラグクリックイベントハンドラ.
 * @returns {JSX.Element} 暗記フラグ.
 */
export const BookmarkIcon: React.FC<{
  isMemorized: boolean;
  onClickBookmarkIconHandler: () => void;
}> = ({ isMemorized, onClickBookmarkIconHandler }) => {
  return isMemorized ? (
    <FaBookmark
      className={classes.bookmarkIcon}
      onClick={onClickBookmarkIconHandler}
    />
  ) : (
    <FaRegBookmark
      className={classes.bookmarkIcon}
      onClick={onClickBookmarkIconHandler}
    />
  );
};

/**
 * ドロップダウンアイコン.
 *
 * @param {function} onClickModifyLinkHandler - 修正リンククリックイベントハンドラ.
 * @param {function} onClickDeleteLinkHandler - 削除リンククリックイベントハンドラ.
 * @returns {JSX.Element} ドロップダウンアイコン.
 */
export const DropDownIcon: React.FC<{
  onClickModifyLinkHandler: () => void;
  onClickDeleteLinkHandler: () => void;
}> = ({ onClickModifyLinkHandler, onClickDeleteLinkHandler }) => {
  // ドロップダウン表示フラグ
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  // ドロップダウンアイコンクリックイベントハンドラ
  const onClickDropDownIconHandler = () => {
    setShowDropDown((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <AiOutlineMore
        className={classes.modifyIcon}
        onClick={onClickDropDownIconHandler}
      />
      {showDropDown && (
        <ul className={classes.dropdown__lists}>
          <li
            className={classes.dropdown__list}
            onClick={onClickModifyLinkHandler}
          >
            <FaPen />
            <span>修正</span>
          </li>
          <li
            className={classes.dropdown__list}
            onClick={onClickDeleteLinkHandler}
          >
            <AiFillDelete />
            <span>削除</span>
          </li>
        </ul>
      )}
    </>
  );
};

/**
 * 追加アイコン.
 *
 * @param {function} onClickAddIconHandler - 追加アイコンクリックイベントハンドラ.
 * @returns {JSX.Element} 追加アイコン.
 */
export const AddIcon: React.FC<{ onClickAddIconHandler: () => void }> = ({
  onClickAddIconHandler,
}) => {
  return (
    <div className={classes.addIcon} onClick={onClickAddIconHandler}>
      <FaPlus />
    </div>
  );
};

/**
 * 単語帳関連のアイコン.
 *
 * @param {boolean} isFavorite - お気に入りか.
 * @param {function} onClickFavoriteIconHandler - お気に入りアイコンクリックイベントハンドラ.
 * @param {function} onClickModifyLinkHandler - 修正リンククリックイベントハンドラ.
 * @param {function} onClickDeleteLinkHandler - 削除リンククリックイベントハンドラ.
 * @returns {JSX.Element} 単語帳連のアイコン.
 */
export const BookIcon: React.FC<{
  isFavorite: boolean;
  onClickFavoriteIconHandler: () => void;
  onClickModifyLinkHandler: () => void;
  onClickDeleteLinkHandler: () => void;
}> = ({
  isFavorite,
  onClickFavoriteIconHandler,
  onClickModifyLinkHandler,
  onClickDeleteLinkHandler,
}) => {
  return (
    <div className="floatRight _ignoreClick">
      <div className={classes.bookIconWrap}>
        <FavoriteIcon
          isFavorite={isFavorite}
          onClickFavoriteIconHandler={onClickFavoriteIconHandler}
        />
        <DropDownIcon
          onClickModifyLinkHandler={onClickModifyLinkHandler}
          onClickDeleteLinkHandler={onClickDeleteLinkHandler}
        />
      </div>
    </div>
  );
};

/**
 * 単語関連のアイコン.
 *
 * @param {boolean} isMemorized - 暗記済みか.
 * @param {function} onClickBookmarkIconHandler - 暗記フラグクリックイベントハンドラ.
 * @param {function} onClickModifyLinkHandler - 修正リンククリックイベントハンドラ.
 * @param {function} onClickDeleteLinkHandler - 削除リンククリックイベントハンドラ.
 * @returns {JSX.Element} 単語関連のアイコン.
 */
export const WordIcon: React.FC<{
  isMemorized: boolean;
  onClickBookmarkIconHandler: () => void;
  onClickModifyLinkHandler: () => void;
  onClickDeleteLinkHandler: () => void;
}> = ({
  isMemorized,
  onClickBookmarkIconHandler,
  onClickModifyLinkHandler,
  onClickDeleteLinkHandler,
}) => {
  return (
    <div className={classes.wordIconWrap}>
      <BookmarkIcon
        isMemorized={isMemorized}
        onClickBookmarkIconHandler={onClickBookmarkIconHandler}
      />
      <DropDownIcon
        onClickModifyLinkHandler={onClickModifyLinkHandler}
        onClickDeleteLinkHandler={onClickDeleteLinkHandler}
      />
    </div>
  );
};

/**
 * 任意アイコン.
 *
 * @returns {JSX.Element} 任意アイコン.
 */
export const OptionalIcon = () => {
  return <span className={classes.optionalIcon}>任意</span>;
};

/**
 * 入力欄追加アイコン.
 *
 * @param {number} index - （任意）インデックス.
 * @param {function} onClickAddInputIconHandler - 入力欄追加アイコンクリックイベントハンドラ.
 * @returns {JSX.Element} 入力欄追加アイコン.
 */
export const AddInputIcon = React.memo(
  ({
    index,
    onClickAddInputIconHandler,
  }: {
    index?: number;
    onClickAddInputIconHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  }) => {
    return (
      <div
        className={`${classes.addInputIconWrap} alignItemsCenter`}
        onClick={onClickAddInputIconHandler}
        data-meaning-index={`${index}`}
      >
        <FaPlus className={classes.addInputIcon} />
      </div>
    );
  }
);

AddInputIcon.displayName = "AddInputIcon";

/**
 * 前のページへ戻るアイコン.
 *
 * @returns {JSX.Element} 前のページへ戻るアイコン.
 */
export const GoBackIcon = () => {
  return <FaAngleLeft className={classes.goBackIcon} />;
};

/**
 * 回答チェックアイコン.
 *
 * @param {string} checkedAnswer - チェックをつけた回答.
 * @param {string} correctAnswer - 正解.
 * @returns {JSX.Element} 回答チェックアイコン.
 */
export const CheckAnswerIcon: React.FC<{
  checkedAnswer: string;
  correctAnswer: string;
}> = ({ checkedAnswer, correctAnswer }) => {
  return checkedAnswer === correctAnswer ? (
    <FaCheck className={classes.correctAnswerIcon} />
  ) : (
    <FaTimes className={classes.wrongAnswerIcon} />
  );
};
