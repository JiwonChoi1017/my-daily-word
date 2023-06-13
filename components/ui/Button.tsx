import React from "react";
import classes from "@/styles/Button.module.css";

/** Props. */
interface Props {
  /** テキスト. */
  text: string;
  /** クラス名. */
  className: string;
  /** 注釈. */
  note?: string;
  /** (任意)非活性状態か. */
  isDisabled?: boolean;
  /** （任意）クリックイベントハンドラ. */
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * ボタン.
 *
 * @param {string} className - クラス名.
 * @param {string} text - テキスト.
 * @param {boolean} isDisabled - (任意)非活性状態か.
 * @param {string} clickHandler - (任意)クリックイベントハンドラ.
 * @returns {JSX.Element} ボタン.
 */
export const Button: React.FC<{
  className: string;
  text: string;
  isDisabled?: boolean;
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className, text, isDisabled = false, clickHandler }) => {
  // ボタン
  const button = (
    <button
      type="button"
      className={classes[className]}
      disabled={isDisabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!clickHandler) return;
        clickHandler(e);
      }}
    >
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
        className={first.className}
        text={first.text}
        isDisabled={first.isDisabled}
        clickHandler={first.clickHandler}
      />
      <Button
        className={second.className}
        text={second.text}
        isDisabled={second.isDisabled}
        clickHandler={second.clickHandler}
      />
    </div>
  );
};

/**
 * クイズ用ダブルボタン.
 *
 * @param {Props} first - 1つ目.
 * @param {Props} second - 2つ目.
 * @returns {JSX.Element} クイズ用ダブルボタン.
 */
export const DoubleButtonForQuiz: React.FC<{
  button: {
    first: Props;
    second: Props;
  };
}> = ({ button }) => {
  const { first, second } = button;

  return (
    <div className={classes.button__wrap}>
      <div>
        <Button
          className={first.className}
          text={first.text}
          isDisabled={first.isDisabled}
          clickHandler={first.clickHandler}
        />
        {first.note && <p className={classes.note}>{first.note}</p>}
        <Button
          className={second.className}
          text={second.text}
          isDisabled={second.isDisabled}
          clickHandler={second.clickHandler}
        />
        {second.note && <p className={classes.note}>{second.note}</p>}
      </div>
    </div>
  );
};

/**
 * 重複チェックボタン.
 *
 * @param {boolean} isDisabled - 非活性状態か.
 * @param {function} clickHandler - クリックイベントハンドラ.
 * @returns {JSX.Element} 重複チェックボタン.
 */
export const DuplicateCheckButton: React.FC<{
  isDisabled: boolean;
  clickHandler: () => void;
}> = ({ isDisabled, clickHandler }) => {
  return (
    <Button
      className="duplicateCheckButton"
      text="重複チェック"
      isDisabled={isDisabled}
      clickHandler={clickHandler}
    />
  );
};

/**
 * エラーページのボタン.
 *
 * @param {string} text - テキスト.
 * @param {function} clickHandler - クリックイベントハンドラ.
 * @returns {JSX.Element} エラーページのボタン.
 */
export const ErrorPageButton: React.FC<{
  text: string;
  clickHandler: () => void;
}> = ({ text, clickHandler }) => {
  return (
    <div className={`${classes.button__wrap} marginTop20`}>
      <Button className="button" text={text} clickHandler={clickHandler} />
    </div>
  );
};
