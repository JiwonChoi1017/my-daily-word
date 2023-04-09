import { Button, DoubleButton } from "@/components/ui/Button";
import InputForm from "@/components/ui/InputForm";
import { Book } from "@/types/Vocabulary";
import React, { useRef } from "react";
import classes from "../../../../styles/InputForm.module.css";

/**
 * 単語帳フォーム.
 *
 * @param {function} addBook - 単語帳追加イベント.
 * @param {boolean} showCancelButton - キャンセルボタンの表示状態.
 * @param {function} onClickCancelButton - 前のページへ戻るイベント.
 * @returns {JSX.Element} 単語帳フォーム.
 */
const VocabularyBookForm: React.FC<{
  addBook: (bookInfo: Omit<Book, "id" | "modifiedAt">) => void;
  showCancelButton: boolean;
  onClickCancelButton: () => void;
}> = ({ addBook, showCancelButton, onClickCancelButton }) => {
  // 各入力項目のref
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const wordRef = useRef<HTMLSelectElement>(null);
  const meaningRef = useRef<HTMLSelectElement>(null);
  // 送信イベントハンドラ
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !wordRef.current ||
      !meaningRef.current
    ) {
      return;
    }

    const date = new Date();
    const currentDateArray: string[] = date.toLocaleDateString().split("/");
    // 日時に0をつけて文字列を結合
    const currentDateString = currentDateArray
      .map((date) => date.padStart(2, "0"))
      .join("");
    const currentTimeString = date
      .toLocaleTimeString()
      .split(":")
      .join("")
      .padStart(6, "0");

    addBook({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      word: wordRef.current.value,
      meaning: meaningRef.current.value,
      createdAt: `${currentDateString}${currentTimeString}`,
      isFavorite: false,
    });
  };
  // ボタン要素
  const buttonElement = showCancelButton ? (
    <DoubleButton
      button={{
        first: {
          className: "second__double",
          text: "キャンセル",
          clickHandler: onClickCancelButton,
        },
        second: {
          className: "first__double",
          text: "単語帳を追加",
          isSubmit: true,
        },
      }}
    />
  ) : (
    <Button text="単語帳を追加" className="first" isSubmit={true} />
  );

  return (
    <InputForm>
      <div className={classes.inputform__inner}>
        <form
          onSubmit={(e: React.FormEvent) => {
            onSubmitHandler(e);
          }}
        >
          <div>
            <label htmlFor="title">タイトル</label>
            <input
              ref={titleRef}
              type="text"
              id="title"
              maxLength={100}
              required
            />
          </div>
          <div>
            <label htmlFor="word">原文の言語</label>
            <div className={classes.selectbox}>
              <select ref={wordRef} id="word" required>
                <option value="japanese">日本語</option>
                <option value="korean">韓国語</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="meaning">訳文の言語</label>
            <div className={classes.selectbox}>
              <select ref={meaningRef} id="meaning" required>
                <option value="japanese">日本語</option>
                <option value="korean">韓国語</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="description">詳細</label>
            <textarea
              ref={descriptionRef}
              id="description"
              rows={10}
              maxLength={1000}
              required
            />
          </div>
          {buttonElement}
        </form>
      </div>
    </InputForm>
  );
};

export default VocabularyBookForm;
