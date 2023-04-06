import React, { useState } from "react";
import { AiOutlineMore, AiFillDelete } from "react-icons/ai";
import { FaPen, FaBookmark, FaRegBookmark } from "react-icons/fa";
import classes from "./Icon.module.css";

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
