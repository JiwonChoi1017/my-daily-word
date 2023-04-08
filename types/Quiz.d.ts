import { QUIZ_KIND } from "@/constants/quizConstans";

/** クイズ種別. */
export type QuizKind = keyof typeof QUIZ_KIND;

// TODO: Omitを使用してWordで代替できそう
/** 回答. */
export type Answer = {
  /** id. */
  id: string;
  /** 単語. */
  word: string;
  /** 発音. */
  pronunciation: string;
  /** 意味. */
  meaning: string;
};
