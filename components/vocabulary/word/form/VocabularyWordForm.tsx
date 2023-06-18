import { AddInputIcon, OptionalIcon } from "@/components/icon/Icon";
import {
  Button,
  DoubleButton,
  DuplicateCheckButton,
} from "@/components/ui/Button";
import { Meaning, Word } from "@/types/Vocabulary";
import React, { useEffect, useRef, useState } from "react";

import { DateHelper } from "@/helpers/date-helper";
import InputForm from "@/components/ui/InputForm";
import classes from "@/styles/VocabularyWordForm.module.css";

/** Props. */
interface Props {
  /** 修正フォームか. */
  isModifyForm: boolean;
  /** 単語情報. */
  wordInfo: Word;
  /** 重複する単語リスト. */
  duplicateWordList: Word[];
  /** 重複する単語を取得. */
  findDuplicateWords: (keyword: string) => void;
  /** 単語追加イベント. */
  addWord: (wordInfo: Omit<Word, "id" | "updatedAt">) => void;
  /** 単語更新イベント. */
  updateWord: (wordInfo: Word) => void;
  /** キャンセルボタンを表示するか. */
  showCancelButton: boolean;
  /** キャンセルボタンクリックイベントハンドラ. */
  onClickCancelButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** 日付関連ヘルパー. */
const dateHelper = new DateHelper();

/**
 * 単語フォーム.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語フォーム.
 */
const VocabularyWordForm = ({
  isModifyForm,
  wordInfo,
  duplicateWordList,
  findDuplicateWords,
  addWord,
  updateWord,
  showCancelButton,
  onClickCancelButton,
}: Props) => {
  // 各入力項目のref
  const wordsRef = useRef<HTMLInputElement[]>([]);
  const pronunciationsRef = useRef<HTMLInputElement[]>([]);
  const meaningsRef = useRef<HTMLInputElement[]>([]);
  const examplesRef = useRef<HTMLInputElement[]>([]);
  // 単語状態
  const [words, setWords] = useState<string[]>([]);
  // 発音状態
  const [pronunciations, setPronunciations] = useState<string[]>([]);
  // 意味状態
  const [meanings, setMeanings] = useState<Meaning[]>([
    { meaning: "", examples: [""] },
  ]);
  // 例文refのインデックス
  const [exampleRefIndex, setExampleRefIndex] = useState<number>(0);
  // 活性/非活性状態
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // キーワード
  const [keyword, setKeyword] = useState<string>("");
  // 重複する単語リストを表示するか
  const [showDuplicateWordList, setShowDuplicatedWordList] =
    useState<boolean>(false);

  useEffect(() => {
    const { words, pronunciations, meanings } = wordInfo;

    wordsRef.current = wordsRef.current.slice(0, words.length);
    setWords(words.length ? words : [""]);

    pronunciationsRef.current = pronunciationsRef.current.slice(
      0,
      pronunciations.length
    );
    setPronunciations(pronunciations.length ? pronunciations : [""]);

    const newMeaningList = meanings.reduce((acc: Meaning[], meaning) => {
      // 例文が存在しない場合、空文字を入れた配列を返す
      if (!meaning.examples || !meaning.examples.length) {
        return [...acc, { meaning: meaning.meaning, examples: [""] }];
      }
      return [...acc, meaning];
    }, []);
    setMeanings(newMeaningList);
    meaningsRef.current = meaningsRef.current.slice(0, newMeaningList.length);

    const examples: string[] = [];
    newMeaningList.map((meaning) => {
      meaning.examples.map((example) => {
        examples.push(example);
      });
    });
    examplesRef.current = examplesRef.current.slice(0, examples.length);

    // 活性/非活性状態を更新
    setIsDisabled(
      !words.length || !pronunciations.length || !newMeaningList.length
    );
  }, [wordInfo]);

  // 重複チェッククリックイベントハンドラ
  const onClickDuplicateCheckButtonHandler = async () => {
    if (!wordsRef.current) {
      return;
    }

    await findDuplicateWords(keyword);
    setShowDuplicatedWordList(true);
  };
  // 単語追加イベントハンドラ
  const onAddWordHanlder = () => {
    setWords((prevState) => {
      return [...prevState, ""];
    });
    setShowDuplicatedWordList(false);
  };
  // 発音追加イベントハンドラ
  const onAddPronunciationHandler = () => {
    setPronunciations((prevState) => {
      return [...prevState, ""];
    });
  };
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
    if (
      !wordsRef.current ||
      !pronunciationsRef.current ||
      !meaningsRef.current
    ) {
      return;
    }
    const words = wordsRef.current.reduce((acc: string[], word) => {
      if (!word.value || /^\s*$/.test(word.value)) {
        return acc;
      }
      return [...acc, word.value];
    }, []);
    const pronunciations = pronunciationsRef.current.reduce(
      (acc: string[], pronunciation) => {
        if (!pronunciation.value || /^\s*$/.test(pronunciation.value)) {
          return acc;
        }
        return [...acc, pronunciation.value];
      },
      []
    );
    const meanings = meaningsRef.current.reduce((acc: string[], meaning) => {
      if (!meaning.value || /^\s*$/.test(meaning.value)) {
        return acc;
      }
      return [...acc, meaning.value];
    }, []);
    // 活性/非活性状態を更新
    setIsDisabled(!words.length || !pronunciations.length || !meanings.length);

    // キーワードを更新
    const keyword = wordsRef.current[wordsRef.current.length - 1].value;
    setKeyword(keyword);
  };
  // 単語入力欄
  const wordsInput = (
    <ul>
      {words.map((item, idx) => {
        return (
          <li key={`word_${idx}`}>
            <p className={classes.number}>{idx + 1}.</p>
            <input
              ref={(el) => {
                if (!el) {
                  return;
                }
                wordsRef.current[idx] = el;
              }}
              className={idx === words.length - 1 ? classes.wordInput : ""}
              type="text"
              id="word"
              maxLength={50}
              defaultValue={item}
              onChange={() => {
                onChangeInputHandler();
                setShowDuplicatedWordList(false);
              }}
            />
            {idx === words.length - 1 && (
              <>
                <DuplicateCheckButton
                  isDisabled={!keyword || /^\s*$/.test(keyword)}
                  clickHandler={onClickDuplicateCheckButtonHandler}
                />
                {showDuplicateWordList && duplicateWordList.length > 0 && (
                  <>
                    <p>
                      既に{duplicateWordList.length}件の単語が登録済みです。
                      <br />
                      登録された単語を確認してください。
                    </p>
                    <ul>
                      {duplicateWordList.map((word) => {
                        const { id, words, pronunciations, meanings } = word;
                        return (
                          <li key={id}>
                            {words.join(" / ")}【{pronunciations.join(" / ")}】
                            <ul>
                              {meanings.map((meaning) => (
                                <li key={id}>{meaning.meaning}</li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                {showDuplicateWordList && !duplicateWordList.length && (
                  <p>登録済みの単語が存在しません。</p>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
  // 発音入力欄
  const pronunciationsInput = (
    <ul>
      {pronunciations.map((item, idx) => {
        return (
          <li key={`pronunciation_${idx}`}>
            <p className={classes.number}>{idx + 1}.</p>
            <input
              ref={(el) => {
                if (!el) {
                  return;
                }
                pronunciationsRef.current[idx] = el;
              }}
              type="text"
              id="pronunciation"
              maxLength={100}
              defaultValue={item}
              onChange={onChangeInputHandler}
            />
          </li>
        );
      })}
    </ul>
  );
  // 意味入力欄
  const meaningsInput = meanings.map((item, idx) => {
    const meaningInput = (
      <li key={`meaning_${idx}`}>
        <p className={classes.number}>{idx + 1}.</p>
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
          <p className={classes.number}>{example_idx + 1})</p>
          <input
            ref={(el) => {
              if (!el) {
                return;
              }
              examplesRef.current[currentExampleIndex] = el;
            }}
            id={`example_${idx}_${example_idx}`}
            className={classes.exampleInput}
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
        <label className={classes.label}>
          意味
          {idx === meanings.length - 1 && (
            <AddInputIcon onClickAddInputIconHandler={onAddMeaningHandler} />
          )}
        </label>
        <ul key={`meaning_${idx}`}>{meaningInput}</ul>
        <label className={classes.label}>
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
  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !wordsRef.current ||
      !pronunciationsRef.current ||
      !meaningsRef.current ||
      !examplesRef.current
    ) {
      return;
    }

    const words = wordsRef.current.reduce((acc: string[], word) => {
      if (!word.value || /^\s*$/.test(word.value)) {
        return acc;
      }
      return [...acc, word.value];
    }, []);
    const pronunciations = pronunciationsRef.current.reduce(
      (acc: string[], pronunciation) => {
        if (!pronunciation.value || /^\s*$/.test(pronunciation.value)) {
          return acc;
        }
        return [...acc, pronunciation.value];
      },
      []
    );
    let meanings = meaningsRef.current.reduce((acc: Meaning[], meaning) => {
      if (!meaning.value) {
        return acc;
      }
      return [...acc, { meaning: meaning.value, examples: [] }];
    }, []);

    examplesRef.current.map((example) => {
      const index = example.dataset["meaningIndex"];
      if (!index) return;

      const newIndex = +index;
      if (isNaN(newIndex)) return;
      // 例文が空だったら早期リターン
      if (!example.value || /^\s*$/.test(example.value)) return;

      meanings[newIndex].examples.push(example.value);
    });

    // 空白文字を意味の配列から排除する
    meanings = meanings.filter((meaning) => {
      return !/^\s*$/.test(meaning.meaning);
    });

    const date = new Date();
    const dateTimeString = dateHelper.createDateTimeString(date);

    if (isModifyForm) {
      return updateWord({
        ...wordInfo,
        words,
        pronunciations,
        meanings,
        updatedAt: dateTimeString,
      });
    }

    addWord({
      words,
      pronunciations,
      meanings,
      isMemorized: false,
      createdAt: dateTimeString,
    });
  };
  // 入力欄要素
  const inputFieldsElement = (
    <div className="inputField">
      <div>
        <label className={classes.label} htmlFor="word">
          単語
          <AddInputIcon onClickAddInputIconHandler={onAddWordHanlder} />
        </label>
        {wordsInput}
      </div>
      <div>
        <label className={classes.label} htmlFor="pronunciation">
          発音
          <AddInputIcon
            onClickAddInputIconHandler={onAddPronunciationHandler}
          />
        </label>
        {pronunciationsInput}
      </div>
      {meaningsInput}
    </div>
  );
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
          isDisabled: isDisabled,
          clickHandler: onSubmitHandler,
        },
      }}
    />
  ) : (
    <Button
      text={isModifyForm ? "修正" : "単語を追加"}
      className="first"
      isDisabled={isDisabled}
      clickHandler={onSubmitHandler}
    />
  );

  return (
    <InputForm>
      {inputFieldsElement}
      <div className={classes.buttonWrap}>{buttonElement}</div>
    </InputForm>
  );
};

export default VocabularyWordForm;
