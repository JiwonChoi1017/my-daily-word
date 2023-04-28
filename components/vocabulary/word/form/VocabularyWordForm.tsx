import { Button, DoubleButton } from "@/components/ui/Button";
import { AddInputIcon, OptionalIcon } from "@/components/icon/Icon";
import InputForm from "@/components/ui/InputForm";
import { Meaning, Word } from "@/types/Vocabulary";
import React, { useEffect, useRef, useState } from "react";

/**
 * 単語フォーム.
 *
 * @param {boolean} isModifyForm - 修正フォームか.
 * @param {Word} wordInfo - 単語情報.
 * @param {function} addWord - 単語追加イベント.
 * @param {function} updateWord - 単語更新イベント.
 * @param {boolean} showCancelButton - キャンセルボタンの表示状態.
 * @param {function} onClickCancelButton - 前のページへ戻るイベント.
 * @returns {JSX.Element} 単語フォーム.
 */
const VocabularyWordForm: React.FC<{
  isModifyForm: boolean;
  wordInfo: Word;
  addWord: (wordInfo: Omit<Word, "id" | "modifiedAt">) => void;
  updateWord: (wordInfo: Word) => void;
  showCancelButton: boolean;
  onClickCancelButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({
  isModifyForm,
  wordInfo,
  addWord,
  updateWord,
  showCancelButton,
  onClickCancelButton,
}) => {
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
    const { word, pronunciation } = wordInfo;

    const newMeaningList = wordInfo.meanings.reduce(
      (acc: Meaning[], meaning) => {
        // 例文が存在しない場合、空文字を入れた配列を返す
        if (!meaning.examples || !meaning.examples.length) {
          return [...acc, { meaning: meaning.meaning, examples: [""] }];
        }
        return [...acc, meaning];
      },
      []
    );

    setMeanings(newMeaningList);
    meaningsRef.current = meaningsRef.current.slice(0, meanings.length);

    const examples: string[] = [];
    meanings.map((meaning) => {
      meaning.examples.map((example) => {
        examples.push(example);
      });
    });
    examplesRef.current = examplesRef.current.slice(0, examples.length);

    // 活性/非活性状態を更新
    setIsDisabled(!word || !pronunciation || !meanings.length);
  }, [wordInfo]);
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
          defaultValue={item.meaning}
          onChange={onChangeInputHandler}
        />
      </li>
    );
    // 例文入力欄
    const examplesInput = item.examples.map((example, example_idx) => {
      const prevExampleList: string[] = [];
      for (let i = 0; i <= idx; i++) {
        const prevMeaning = meanings[i];
        prevMeaning.examples.map((prevExample, prev_example_idx) => {
          if (i < idx || (i === idx && example_idx > prev_example_idx)) {
            prevExampleList.push(prevExample);
          }
        });
      }
      const currentExampleIndex = isModifyForm
        ? prevExampleList.length
        : exampleRefIndex;
      return (
        <li key={`example_${idx}_${example_idx}`}>
          <p>({example_idx + 1})</p>
          <input
            ref={(el) => {
              if (!el) {
                return;
              }
              examplesRef.current[currentExampleIndex] = el;
            }}
            id={`example_${idx}_${example_idx}`}
            type="text"
            maxLength={300}
            defaultValue={example}
            onChange={onChangeInputHandler}
            data-meaning-index={`${idx}`}
          />
        </li>
      );
    });

    return (
      <div key={idx}>
        <label className="alignItemsCenter">
          意味
          {idx === meanings.length - 1 && (
            <AddInputIcon onClickAddInputIconHandler={onAddMeaningHandler} />
          )}
        </label>
        <ul key={`meaning_${idx}`}>{meaningInput}</ul>
        <label className="alignItemsCenter">
          例文
          <OptionalIcon />
          <AddInputIcon
            index={idx}
            onClickAddInputIconHandler={onAddExampleHanlder}
          />
        </label>
        <ul key={`examples_${idx}`}>{examplesInput}</ul>
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

    if (isModifyForm) {
      return updateWord({
        ...wordInfo,
        word: wordRef.current.value,
        meanings,
        pronunciation: pronunciationRef.current.value,
        modifiedAt: `${currentDateString}${currentTimeString}`,
      });
    }

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
          text: isModifyForm ? "修正" : "単語を追加",
          isSubmit: true,
          isDisabled: isDisabled,
        },
      }}
    />
  ) : (
    <Button
      text={isModifyForm ? "修正" : "単語を追加"}
      className="first"
      isSubmit={true}
    />
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
            defaultValue={wordInfo.word}
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
            defaultValue={wordInfo.pronunciation}
            onChange={onChangeInputHandler}
          />
        </div>
        {meaningsInput}
        {buttonElement}
      </form>
    </InputForm>
  );
};

export default VocabularyWordForm;
