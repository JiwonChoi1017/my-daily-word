import { Button, DoubleButton } from "@/components/ui/Button";
import React, { useRef, useState } from "react";

import { Book } from "@/types/Vocabulary";
import { DateHelper } from "@/helpers/date-helper";
import InputForm from "@/components/ui/InputForm";
import { LANGUAGES } from "@/constants/constants";
import { SPACE_CHECK_REGEX } from "@/constants/regexConstants";
import classes from "@/styles/InputForm.module.css";
import { useEffect } from "react";

/** Props. */
interface Props {
  /** 修正フォームか. */
  isModifyForm: boolean;
  /** 単語帳情報. */
  bookInfo: Book;
  /** 単語帳追加イベント. */
  addBook: (bookInfo: Omit<Book, "id" | "updatedAt">) => void;
  /** 単語帳更新イベント. */
  updateBook: (bookInfo: Book) => void;
  /** キャンセルボタンの表示状態. */
  showCancelButton: boolean;
  /** 前のページへ戻るイベント. */
  onClickCancelButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** 日付関連ヘルパー. */
const dateHelper = new DateHelper();

/**
 * 単語帳フォーム.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語帳フォーム.
 */
const VocabularyBookForm = ({
  isModifyForm,
  bookInfo,
  addBook,
  updateBook,
  showCancelButton,
  onClickCancelButton,
}: Props): JSX.Element => {
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
  // 送信済みのフラグ
  const [alreadySent, setAlreadySent] = useState<boolean>(false);
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
    // すでに送信済みなら、そのままリターン
    if (alreadySent) {
      return;
    }

    // 送信済みフラグをtrueに更新
    setAlreadySent(true);

    const date = new Date();
    const dateTimeString = dateHelper.createDateTimeString(date);

    if (isModifyForm) {
      return updateBook({
        ...bookInfo,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        entry: entryRef.current.value,
        body: bodyRef.current.value,
        updatedAt: dateTimeString,
      });
    }

    addBook({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      entry: entryRef.current.value,
      body: bodyRef.current.value,
      createdAt: dateTimeString,
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
    setIsDisabled(
      !title ||
        SPACE_CHECK_REGEX.test(title) ||
        !description ||
        SPACE_CHECK_REGEX.test(description) ||
        !entry ||
        !body
    );
  };

  useEffect(() => {
    const { title, description, entry, body } = bookInfo;
    // 各言語状態を更新
    setSelectedEntry(entry);
    setSelectedBody(body);
    // 活性/非活性状態を更新
    setIsDisabled(
      !title ||
        SPACE_CHECK_REGEX.test(title) ||
        !description ||
        SPACE_CHECK_REGEX.test(description) ||
        !entry ||
        !body
    );
  }, [bookInfo]);

  // オプション要素
  const optionElement = Object.values(LANGUAGES).map((language) => {
    return (
      <option key={language.value} value={language.value}>
        {language.label}
      </option>
    );
  });
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
            {optionElement}
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
            {optionElement}
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
    </InputForm>
  );
};

export default VocabularyBookForm;
