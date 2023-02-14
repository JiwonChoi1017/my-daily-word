import React, { useRef } from "react";

// TODO: 修正フォームも共通した方がいい？
const VocabularyBookForm: React.FC<{
  onAddBookHandler: (bookInfo: {
    title: string;
    description: string;
    word: string;
    meaning: string;
  }) => void;
}> = ({ onAddBookHandler }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const wordRef = useRef<HTMLSelectElement>(null);
  const meaningRef = useRef<HTMLSelectElement>(null);

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

    onAddBookHandler({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      word: wordRef.current.value,
      meaning: meaningRef.current.value,
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
