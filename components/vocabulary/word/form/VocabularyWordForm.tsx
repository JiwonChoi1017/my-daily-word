import { Meaning } from "@/types/Vocabulary";
import React, { useEffect, useRef, useState } from "react";

const VocabularyWordForm: React.FC<{
  onAddWordHandler: (wordInfo: {
    word: string;
    meanings: Meaning[];
    pronunciation: string;
    isFavorite: boolean;
    isMemorized: boolean;
  }) => void;
}> = ({ onAddWordHandler }) => {
  const [meanings, setMeanings] = useState<Meaning[]>([
    { meaning: "", examples: [""] },
  ]);

  const wordRef = useRef<HTMLInputElement>(null);
  const meaningsRef = useRef<HTMLInputElement[]>([]);
  const pronunciationRef = useRef<HTMLInputElement>(null);
  const examplesRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    meaningsRef.current = meaningsRef.current.slice(0, meanings.length);

    const examples: string[] = [];
    meanings.map((meaning) => {
      meaning.examples.map((example) => {
        examples.push(example);
      });
    });
    examplesRef.current = examplesRef.current.slice(0, examples.length);
  }, [meanings]);

  const onAddMeaningHandler = () => {
    setMeanings((prevState) => {
      return [...prevState, { meaning: "", examples: [""] }];
    });
  };

  const onAddExampleHanlder = (e: React.MouseEvent<HTMLDivElement>) => {
    // event.currenTarget: イベント処理中だけ event.currentTarget の値が利用できるらしい。
    // もし console.log() で event オブジェクトを変数に格納し、コンソールで currentTarget キーを探すと、その値は null となる。
    // https://developer.mozilla.org/ja/docs/Web/API/Event/currentTarget
    const targetMeaningIndex = e.currentTarget?.dataset["meaningIndex"];
    setMeanings((prevState) => {
      if (!targetMeaningIndex) return prevState;

      const newTargetMeaningIndex = +targetMeaningIndex;
      if (isNaN(newTargetMeaningIndex)) return prevState;

      const currentState = [...prevState];
      const target = Object.assign({}, currentState[newTargetMeaningIndex]);
      target.examples = [...target.examples, ""];
      currentState[newTargetMeaningIndex] = target;

      return currentState;
    });
  };

  const meaningsInput = meanings.map((item, idx) => {
    const meaningInput = (
      <input
        ref={(el) => {
          if (!el) {
            return;
          }
          meaningsRef.current[idx] = el;
        }}
        key={`meaning_${idx}`}
        id={`meaning_${idx}`}
        type="text"
        required
      />
    );

    const examplesInput = item.examples.map((example, example_idx) => {
      return (
        <input
          ref={(el) => {
            if (!el) {
              return;
            }
            examplesRef.current[example_idx] = el;
          }}
          key={`example_${idx}_${example_idx}`}
          id={`example_${idx}_${example_idx}`}
          type="text"
          data-meaning-index={`${idx}`}
        />
      );
    });

    const addExampleBtn = (
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          onAddExampleHanlder(e);
        }}
        style={{ cursor: "pointer" }}
        data-meaning-index={`${idx}`}
      >
        add example
      </div>
    );

    return (
      <li key={idx}>
        {meaningInput} {examplesInput} {addExampleBtn}
        <br />
      </li>
    );
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !wordRef.current ||
      !meaningsRef.current ||
      !pronunciationRef.current ||
      !examplesRef.current
    ) {
      return;
    }

    const meanings: Meaning[] = [];
    meaningsRef.current.map((meaning) => {
      meanings.push({ meaning: meaning.value, examples: [] });
    });

    // TODO: 例の追加がうまくいかない
    examplesRef.current.map((example) => {
      const index = example.dataset["meaningIndex"];
      if (!index) return;

      const newIndex = +index;
      if (isNaN(newIndex)) return;

      meanings[newIndex].examples.push(example.value);
    });

    onAddWordHandler({
      word: wordRef.current.value,
      meanings: meanings,
      pronunciation: pronunciationRef.current.value,
      isFavorite: false,
      isMemorized: false,
    });
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
        <label htmlFor="pronunciation">pronunciation</label>
        <input ref={pronunciationRef} type="text" id="pronunciation" required />
      </div>
      <div>
        <label>meaning</label>
        <ul>{meaningsInput}</ul>
        <div onClick={onAddMeaningHandler} style={{ cursor: "pointer" }}>
          add meaning
        </div>
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default VocabularyWordForm;
