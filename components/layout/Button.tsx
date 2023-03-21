import React from "react";

/**
 * ボタン.
 *
 * @param {string} className - クラス名.
 * @param {string} text - テキスト.
 * @param {string} clickHandler - クリックイベントハンドラ.
 * @returns {JSX.Element} ボタン.
 */
const Button: React.FC<{
  className: string;
  text: string;
  clickHandler: () => void;
}> = ({ className, text, clickHandler }) => {
  return (
    <button className={className} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
