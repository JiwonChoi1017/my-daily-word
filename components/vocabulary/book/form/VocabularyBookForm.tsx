import InputForm from "@/components/ui/InputForm";
import { Book } from "@/types/Vocabulary";
import React, { useRef } from "react";
import classes from "../../../../styles/InputForm.module.css";

/**
 * 単語帳フォーム.
 *
 * @param {function} addBook - 単語帳追加イベント.
 * @returns {JSX.Element} 単語帳フォーム.
 */
const VocabularyBookForm: React.FC<{
  addBook: (bookInfo: Omit<Book, "id" | "modifiedAt">) => void;
}> = ({ addBook }) => {
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
            <input ref={titleRef} type="text" id="title" required />
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
              required
            />
          </div>
          <button className="first">単語帳を追加</button>
        </form>
      </div>
    </InputForm>
  );
};

export default VocabularyBookForm;
