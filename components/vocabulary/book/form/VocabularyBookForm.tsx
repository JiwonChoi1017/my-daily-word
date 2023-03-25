import { Book } from "@/types/Vocabulary";
import React, { useRef } from "react";

/**
 * 単語帳フォーム.
 *
 * @param {function} addBookHandler - 単語帳追加イベントハンドラ.
 * @returns {JSX.Element} 単語帳フォーム.
 */
const VocabularyBookForm: React.FC<{
  addBookHandler: (bookInfo: Omit<Book, "id" | "modifiedAt">) => void;
}> = ({ addBookHandler }) => {
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

    addBookHandler({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      word: wordRef.current.value,
      meaning: meaningRef.current.value,
      createdAt: `${currentDateString}${currentTimeString}`,
      isFavorite: false,
    });
  };

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        onSubmitHandler(e);
      }}
    >
      <div>
        <label htmlFor="title">title</label>
        <input ref={titleRef} type="text" id="title" required />
      </div>
      <div>
        <label htmlFor="word">word</label>
        <select ref={wordRef} id="word" required>
          <option value="japanese">japanese</option>
          <option value="english">english</option>
          <option value="korean">korean</option>
        </select>
      </div>
      <div>
        <label htmlFor="meaning">meaning</label>
        <select ref={meaningRef} id="meaning" required>
          <option value="japanese">japanese</option>
          <option value="english">english</option>
          <option value="korean">korean</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">description</label>
        <textarea ref={descriptionRef} id="description" rows={5} required />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default VocabularyBookForm;
