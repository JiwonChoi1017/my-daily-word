import React from "react";
import classes from "./Button.module.css";

/**
 * ボタン.
 *
 * @param {string} className - (任意)クラス名.
 * @param {string} text - テキスト.
 * @param {boolean} isSubmit - (任意)送信ボタンか.
 * @param {boolean} isDisabled - (任意)非活性状態か.
 * @param {string} clickHandler - (任意)クリックイベントハンドラ.
 * @returns {JSX.Element} ボタン.
 */
const Button: React.FC<{
  className?: string;
  text: string;
  isSubmit?: boolean;
  isDisabled?: boolean;
  clickHandler?: () => void;
}> = ({
  className,
  text,
  isSubmit = false,
  isDisabled = false,
  clickHandler,
}) => {
  // ボタンクラス
  const buttonClass = className === "second" ? classes.second : className;
  // ボタン
  const button = isSubmit ? (
    <button type="submit" className={classes.first} disabled={isDisabled}>
      {text}
    </button>
  ) : (
    <button className={buttonClass} onClick={clickHandler}>
      {text}
    </button>
  );

  return button;
};

export default Button;
