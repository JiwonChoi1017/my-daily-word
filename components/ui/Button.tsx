import React from "react";
import classes from "./Button.module.css";

/** Props. */
interface Props {
  /** テキスト. */
  text: string;
  /** クラス名. */
  className: string;
  /** (任意)送信ボタンか. */
  isSubmit?: boolean;
  /** （任意）クリックイベントハンドラ. */
  clickHandler?: () => void;
}

/**
 * ボタン.
 *
 * @param {string} className - クラス名.
 * @param {string} text - テキスト.
 * @param {boolean} isSubmit - (任意)送信ボタンか.
 * @param {boolean} isDisabled - (任意)非活性状態か.
 * @param {string} clickHandler - (任意)クリックイベントハンドラ.
 * @returns {JSX.Element} ボタン.
 */
export const Button: React.FC<{
  className: string;
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
  // ボタン
  const button = isSubmit ? (
    <button type="submit" className={className} disabled={isDisabled}>
      {text}
    </button>
  ) : (
    <button className={className} onClick={clickHandler}>
      {text}
    </button>
  );

  return button;
};

/**
 * ダブルボタン.
 *
 * @param {Props} first - 1つ目.
 * @param {Props} second - 2つ目.
 * @returns {JSX.Element} ダブルボタン.
 */
export const DoubleButton: React.FC<{
  button: {
    first: Props;
    second: Props;
  };
}> = ({ button }) => {
  const { first, second } = button;

  return (
    <div className={classes.button__wrap}>
      <Button
        className={classes[first.className]}
        text={first.text}
        isSubmit={first.isSubmit}
        clickHandler={first.clickHandler}
      />
      <Button
        className={classes[second.className]}
        text={second.text}
        isSubmit={second.isSubmit}
        clickHandler={second.clickHandler}
      />
    </div>
  );
};
