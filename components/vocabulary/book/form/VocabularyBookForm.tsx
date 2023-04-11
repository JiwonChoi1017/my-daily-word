import { Button, DoubleButton } from "@/components/ui/Button";
import InputForm from "@/components/ui/InputForm";
import { Book } from "@/types/Vocabulary";
import React, { useRef, useState } from "react";
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
  onClickCancelButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ addBook, showCancelButton, onClickCancelButton }) => {
  // 各入力項目のref
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const wordRef = useRef<HTMLSelectElement>(null);
  const meaningRef = useRef<HTMLSelectElement>(null);
  // 活性/非活性状態
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
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
  // 入力変更イベントハンドラ
  const onChangeInputHandler = () => {
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !wordRef.current ||
      !meaningRef.current
    ) {
      return;
    }
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const word = wordRef.current.value;
    const meaning = meaningRef.current.value;
    // 活性/非活性状態を更新
    setIsDisabled(!title || !description || !word || !meaning);
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
          isDisabled,
        },
      }}
    />
  ) : (
    <Button
      className="first"
      text="単語帳を追加"
      isSubmit={true}
      isDisabled={isDisabled}
    />
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
              onChange={onChangeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="word">原文の言語</label>
            <div className={classes.selectbox}>
              <select ref={wordRef} id="word" onChange={onChangeInputHandler}>
                <option value="">選択してください</option>
                <option value="japanese">日本語</option>
                <option value="korean">韓国語</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="meaning">訳文の言語</label>
            <div className={classes.selectbox}>
              <select
                ref={meaningRef}
                id="meaning"
                onChange={onChangeInputHandler}
              >
                <option value="">選択してください</option>
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
              onChange={onChangeInputHandler}
            />
          </div>
          {buttonElement}
        </form>
      </div>
    </InputForm>
  );
};

export default VocabularyBookForm;
