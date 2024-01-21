import React from "react";
import classes from "../../styles/Card.module.css";

/** props. */
type Props = {
  /** children. */
  children: React.ReactNode;
  /** エラーか. */
  isError?: boolean;
  /** (任意)カーソルのデフォルト状態に変更すべきか. */
  needToChangeCursorToDefault?: boolean;
  /** (任意)クリックイベントハンドラ. */
  clickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

/**
 * カード.
 *
 * @param {Props} props
 * @returns {JSX.Element} カード
 */
const Card = ({
  children,
  isError = false,
  needToChangeCursorToDefault = false,
  clickHandler,
}: Props): JSX.Element => {
  return (
    <div
      className={`${isError ? classes.card__error : classes.card}${
        needToChangeCursorToDefault ? ` ${classes.cursor__default}` : ""
      }`}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        clickHandler && clickHandler(e);
      }}
    >
      {children}
    </div>
  );
};

export default Card;
