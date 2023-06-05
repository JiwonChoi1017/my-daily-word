/** 言語. */
export const LANGUAGES = {
  /** デフォルト. */
  DEFAULT: {
    value: "",
    label: "選択してください",
  },
  /** 日本語. */
  JAPANESE: {
    value: "japanese",
    label: "日本語",
  },
  /** 英語. */
  ENGLISH: {
    value: "english",
    label: "英語",
  },
  /** 韓国語. */
  KOREAN: {
    value: "korean",
    label: "韓国語",
  },
  /** 中国語. */
  CHINESE: {
    value: "chinese",
    label: "中国語",
  },
  /** フランス語. */
  FRENCH: {
    value: "french",
    label: "フランス語",
  },
} as const;

/** 取得件数. */
export const VOCABULARY_LIST_RESULTS = 20 as const;

/** エラーステータス. */
export const ERROR_STATUS = {
  SUCCESS: "success",
  NOT_FOUND_USER: "not_found_user",
  NOT_FOUND_BOOK: "not_found_book",
  NOT_FOUND_WORD: "not_found_word",
  NOT_ENOUGH_WORD: "not_enough_word",
} as const;
