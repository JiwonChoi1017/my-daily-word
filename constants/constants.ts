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
