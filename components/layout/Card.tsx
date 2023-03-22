import React from "react";
import classes from "../../styles/Card.module.css";

/**
 * カード.
 *
 * @param {React.ReactNode} children.
 * @param {function} clickHandler - (任意)クリックイベントハンドラ.
 * @returns {JSX.Element} カード.
 */
const Card: React.FC<{
  children: React.ReactNode;
  clickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ children, clickHandler }) => {
  return (
    <div
      className={classes.card}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        clickHandler && clickHandler(e);
      }}
    >
      {children}
    </div>
  );
};

export default Card;
