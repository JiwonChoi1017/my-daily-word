import { Button, DoubleButton } from "@/components/ui/Button";
import { OptionalIcon } from "@/components/ui/Icon";
import InputForm from "@/components/ui/InputForm";
import { Meaning, Word } from "@/types/Vocabulary";
import React, { useEffect, useRef, useState } from "react";

/**
 * 単語フォーム.
 *
 * @param {function} addWord - 単語追加イベント.
 * @param {boolean} showCancelButton - キャンセルボタンの表示状態.
 * @param {function} onClickCancelButton - 前のページへ戻るイベント.
 * @returns {JSX.Element} 単語フォーム.
 */
const VocabularyWordForm: React.FC<{
  addWord: (wordInfo: Omit<Word, "id" | "modifiedAt">) => void;
  showCancelButton: boolean;
  onClickCancelButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ addWord, showCancelButton, onClickCancelButton }) => {
  // 各入力項目のref
  const wordRef = useRef<HTMLInputElement>(null);
  const meaningsRef = useRef<HTMLInputElement[]>([]);
  const pronunciationRef = useRef<HTMLInputElement>(null);
  const examplesRef = useRef<HTMLInputElement[]>([]);
  // 意味状態
  const [meanings, setMeanings] = useState<Meaning[]>([
    { meaning: "", examples: [""] },
  ]);
  // 例文refのインデックス
  const [exampleRefIndex, setExampleRefIndex] = useState<number>(0);
  // 活性/非活性状態
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

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
  // 意味追加イベントハンドラ
  const onAddMeaningHandler = () => {
    setMeanings((prevState) => {
      return [...prevState, { meaning: "", examples: [""] }];
    });
    setExampleRefIndex((prevState) => {
      return prevState + 1;
    });
  };
  // 例文追加イベントハンドラ
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
    setExampleRefIndex((prevState) => {
      return prevState + 1;
    });
  };
  // 入力変更イベントハンドラ
  const onChangeInputHandler = () => {
    if (!wordRef.current || !pronunciationRef.current || !meaningsRef.current) {
      return;
    }
    const word = wordRef.current.value;
    const pronunciation = pronunciationRef.current.value;
    const meanings = meaningsRef.current.reduce((acc: string[], meaning) => {
      if (!meaning.value) {
        return acc;
      }
      return [...acc, meaning.value];
    }, []);
    // 活性/非活性状態を更新
    setIsDisabled(!word || !pronunciation || !meanings.length);
  };
  // 意味入力欄
  const meaningsInput = meanings.map((item, idx) => {
    const meaningInput = (
      <li key={`meaning_${idx}`}>
        <input
          ref={(el) => {
            if (!el) {
              return;
            }
            meaningsRef.current[idx] = el;
          }}
          id={`meaning_${idx}`}
          type="text"
          maxLength={300}
          onChange={onChangeInputHandler}
        />
      </li>
    );
    // 例文入力欄
    const examplesInput = item.examples.map((example, example_idx) => {
      return (
        <li key={`example_${idx}_${example_idx}`}>
          <input
            ref={(el) => {
              if (!el) {
                return;
              }
              examplesRef.current[exampleRefIndex] = el;
            }}
            id={`example_${idx}_${example_idx}`}
            type="text"
            maxLength={300}
            onChange={onChangeInputHandler}
            data-meaning-index={`${idx}`}
          />
        </li>
      );
    });
    // 例文追加リンク
    const addExampleInputLink = (
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          onAddExampleHanlder(e);
        }}
        style={{ cursor: "pointer" }}
        data-meaning-index={`${idx}`}
      >
        例文を追加
      </div>
    );

    return (
      <div key={idx}>
        <label>意味</label>
        <ul key={`meaning_${idx}`}>{meaningInput}</ul>
        <label className="alignItemsCenter">
          例文
          <OptionalIcon />
        </label>
        <ul key={`examples_${idx}`}>
          {examplesInput} {addExampleInputLink}
        </ul>
      </div>
    );
  });
  // 送信イベントハンドラ
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

    examplesRef.current.map((example) => {
      const index = example.dataset["meaningIndex"];
      if (!index) return;

      const newIndex = +index;
      if (isNaN(newIndex)) return;
      // 例文が空だったら早期リターン
      if (!example.value) return;

      meanings[newIndex].examples.push(example.value);
    });

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

    addWord({
      word: wordRef.current.value,
      meanings,
      pronunciation: pronunciationRef.current.value,
      isMemorized: false,
      createdAt: `${currentDateString}${currentTimeString}`,
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
          text: "単語を追加",
          isSubmit: true,
          isDisabled: isDisabled,
        },
      }}
    />
  ) : (
    <Button text="単語を追加" className="first" isSubmit={true} />
  );

  return (
    <InputForm>
      <form
        onSubmit={(e: React.FormEvent) => {
          onSubmitHandler(e);
        }}
      >
        <div>
          <label htmlFor="word">単語</label>
          <input
            ref={wordRef}
            type="text"
            id="word"
            maxLength={50}
            onChange={onChangeInputHandler}
          />
        </div>
        <div>
          <label htmlFor="pronunciation">発音</label>
          <input
            ref={pronunciationRef}
            type="text"
            id="pronunciation"
            maxLength={100}
            onChange={onChangeInputHandler}
          />
        </div>
        <div>
          {meaningsInput}
          <div onClick={onAddMeaningHandler} style={{ cursor: "pointer" }}>
            意味を追加
          </div>
        </div>
        {buttonElement}
      </form>
    </InputForm>
  );
};

export default VocabularyWordForm;
