import { Button, DoubleButton } from "@/components/ui/Button";
import React, { useRef, useState } from "react";

import { Book } from "@/types/Vocabulary";
import InputForm from "@/components/ui/InputForm";
import classes from "../../../../styles/InputForm.module.css";
import { useEffect } from "react";

/**
 * 単語帳フォーム.
 *
 * @param {boolean} isModifyForm - 修正フォームか.
 * @param {Book} bookInfo - 単語帳情報.
 * @param {function} addBook - 単語帳追加イベント.
 * @param {function} updateBook - 単語帳更新イベント.
 * @param {boolean} showCancelButton - キャンセルボタンの表示状態.
 * @param {function} onClickCancelButton - 前のページへ戻るイベント.
 * @returns {JSX.Element} 単語帳フォーム.
 */
const VocabularyBookForm: React.FC<{
  isModifyForm: boolean;
  bookInfo: Book;
  addBook: (bookInfo: Omit<Book, "id" | "updatedAt">) => void;
  updateBook: (bookInfo: Book) => void;
  showCancelButton: boolean;
  onClickCancelButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({
  isModifyForm,
  bookInfo,
  addBook,
  updateBook,
  showCancelButton,
  onClickCancelButton,
}) => {
  // 各入力項目のref
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const entryRef = useRef<HTMLSelectElement>(null);
  const bodyRef = useRef<HTMLSelectElement>(null);
  // 選択された見出し語
  const [selectedEntry, setSelectedEntry] = useState<string>("");
  // 選択された本文
  const [selectedBody, setSelectedBody] = useState<string>("");
  // 活性/非活性状態
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // 送信イベントハンドラ
  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !entryRef.current ||
      !bodyRef.current
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

    if (isModifyForm) {
      return updateBook({
        ...bookInfo,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        entry: entryRef.current.value,
        body: bodyRef.current.value,
        updatedAt: `${currentDateString}${currentTimeString}`,
      });
    }

    addBook({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      entry: entryRef.current.value,
      body: bodyRef.current.value,
      createdAt: `${currentDateString}${currentTimeString}`,
      isFavorite: false,
    });
  };
  // 入力変更イベントハンドラ
  const onChangeInputHandler = () => {
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !entryRef.current ||
      !bodyRef.current
    ) {
      return;
    }
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const entry = entryRef.current.value;
    const body = bodyRef.current.value;
    // 各言語状態を更新
    setSelectedEntry(entry);
    setSelectedBody(body);
    // 活性/非活性状態を更新
    setIsDisabled(!title || !description || !entry || !body);
  };

  useEffect(() => {
    const { title, description, entry, body } = bookInfo;
    // 各言語状態を更新
    setSelectedEntry(entry);
    setSelectedBody(body);
    // 活性/非活性状態を更新
    setIsDisabled(!title || !description || !entry || !body);
  }, [bookInfo]);

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
          text: isModifyForm ? "修正" : "単語帳を追加",
          isDisabled,
          clickHandler: onSubmitHandler,
        },
      }}
    />
  ) : (
    <Button
      className="first"
      text={isModifyForm ? "修正" : "単語帳を追加"}
      isDisabled={isDisabled}
      clickHandler={onSubmitHandler}
    />
  );

  return (
    <InputForm>
      <div className={classes.inputform__inner}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            maxLength={100}
            defaultValue={bookInfo.title}
            onChange={onChangeInputHandler}
          />
        </div>
        <div>
          <label htmlFor="entry">見出し語</label>
          <div className={classes.selectbox}>
            <select
              ref={entryRef}
              id="entry"
              value={selectedEntry}
              onChange={onChangeInputHandler}
            >
              <option value="">選択してください</option>
              <option value="japanese">日本語</option>
              <option value="korean">韓国語</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="body">本文</label>
          <div className={classes.selectbox}>
            <select
              ref={bodyRef}
              id="body"
              value={selectedBody}
              onChange={onChangeInputHandler}
            >
              <option value="">選択してください</option>
              <option value="japanese">日本語</option>
              <option value="korean">韓国語</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description">説明文</label>
          <textarea
            ref={descriptionRef}
            id="description"
            rows={10}
            maxLength={1000}
            defaultValue={bookInfo.description}
            onChange={onChangeInputHandler}
          />
        </div>
        {buttonElement}
      </div>
    </InputForm>
  );
};

export default VocabularyBookForm;
