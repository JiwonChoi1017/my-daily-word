import React from "react";
import { SearchIcon } from "../icon/Icon";
import classes from "../../styles/SearchBox.module.css";

/** Props. */
interface Props {
  /** キーワードのref. */
  keywordRef: React.RefObject<HTMLInputElement>;
  /** 変更イベントハンドラ. */
  onChangeHandler: () => void;
}

/**
 * 検索窓.
 *
 * @param {Props} props
 * @returns {JSX.Element} 検索窓.
 */
const SearchBox = ({ keywordRef, onChangeHandler }: Props) => {
  return (
    <div className={classes.searchBoxWrap}>
      <input
        ref={keywordRef}
        type="text"
        className={classes.searchBox}
        onChange={onChangeHandler}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchBox;
