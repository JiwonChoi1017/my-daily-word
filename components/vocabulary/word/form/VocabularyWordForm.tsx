import React, { useEffect, useRef, useState } from "react";

const VocabularyWordForm: React.FC<{
  onAddWordHandler: (wordInfo: {
    word: string;
    meaning: string;
    pronunciation: string;
    examples: string[];
  }) => void;
}> = ({ onAddWordHandler }) => {
  const [examples, setExamples] = useState<number>(1);

  const wordRef = useRef<HTMLInputElement>(null);
  const meaningRef = useRef<HTMLInputElement>(null);
  const pronunciationRef = useRef<HTMLInputElement>(null);
  const examplesRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    examplesRef.current = examplesRef.current.slice(0, examples);
  }, [examples]);

  const examplesInput = Array.from(Array(examples)).map((e, idx) => {
    return (
      <input
        key={idx}
        ref={(el) => {
          if (!el) {
            return;
          }
          examplesRef.current[idx] = el;
        }}
        type="text"
        id={`examples_${idx}`}
      />
    );
  });

  const onAddExampleHandler = () => {
    setExamples((prevState) => {
      return prevState + 1;
    });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !wordRef.current ||
      !meaningRef.current ||
      !pronunciationRef.current ||
      !examplesRef.current
    ) {
      return;
    }

    const exampleList: string[] = [];
    examplesRef.current.map((example) => {
      exampleList.push(example.value);
    });

    onAddWordHandler({
      word: wordRef.current.value,
      meaning: meaningRef.current.value,
      pronunciation: pronunciationRef.current.value,
      examples: exampleList,
    });
  };

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        onSubmitHandler(e);
      }}
    >
      {/* 
        TODO: meaningも複数入力できるように修正。
        それから、お気に入り用のフラグも追加したい。
      */}
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
        <label>examples</label>
        {examplesInput}
        <div onClick={onAddExampleHandler} style={{ cursor: "pointer" }}>
          add example
        </div>
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default VocabularyWordForm;
