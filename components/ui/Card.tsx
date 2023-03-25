import React from "react";
import classes from "../../styles/Card.module.css";

/**
 * カード.
 *
 * @param {React.ReactNode} children.
 * @param {boolean} isError - エラーか.
 * @param {function} clickHandler - (任意)クリックイベントハンドラ.
 * @returns {JSX.Element} カード.
 */
const Card: React.FC<{
  children: React.ReactNode;
  isError?: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ children, isError = false, clickHandler }) => {
  return (
    <div
      className={isError ? classes.card__error : classes.card}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        clickHandler && clickHandler(e);
      }}
    >
      {children}
    </div>
  );
};

export default Card;
