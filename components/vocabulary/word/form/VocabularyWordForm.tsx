import React, { useRef } from "react";

const VocabularyWordForm = () => {
  const wordRef = useRef<HTMLInputElement>(null);
  const meaningRef = useRef<HTMLInputElement>(null);
  const pronunciationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const examplesRef = useRef<HTMLInputElement[]>(null);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !wordRef.current ||
      !meaningRef.current ||
      !pronunciationRef.current ||
      !descriptionRef.current ||
      !examplesRef.current
    ) {
      return;
    }
  };

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        onSubmitHandler(e);
      }}
    >
      <div>
        <label htmlFor="word">word</label>
        <input ref={wordRef} type="text" id="word" required />
      </div>
      <div>
        <label htmlFor="meaning">meaning</label>
        <input ref={meaningRef} type="text" id="meaning" required />
      </div>
      <div>
        <label htmlFor="pronunciation">pronunciation</label>
        <input ref={pronunciationRef} type="text" id="pronunciation" required />
      </div>
      <div>
        <label htmlFor="description">description</label>
        <textarea ref={descriptionRef} id="description" rows={5} required />
      </div>
      {/* TODO: inputタグで例を複数追加できるようにしたい。（string[]） */}
      <div>
        <label htmlFor="examples">examples</label>
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default VocabularyWordForm;
