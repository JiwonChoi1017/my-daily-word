/** 単語帳. */
export type Book = {
  /** id. */
  id: string;
  /** タイトル. */
  title: string;
  /** 見出し語. */
  entry: string;
  /** 本文. */
  body: string;
  /** 説明文. */
  description: string;
  /** 作成日時. */
  createdAt: string;
  /** 更新日時. */
  updatedAt: string;
  /** お気に入り済みか. */
  isFavorite: boolean;
};

/** 単語. */
export type Word = {
  /** id. */
  id: string;
  /** 単語リスト. */
  words: string[];
  /** 発音リスト. */
  pronunciations: string[];
  /** 意味リスト. */
  meanings: Meaning[];
  /** 作成日時. */
  createdAt: string;
  /** 更新日時. */
  updatedAt: string;
  /** 暗記済みか. */
  isMemorized: boolean;
};

/** 意味. */
export type Meaning = {
  /** 意味. */
  meaning: string;
  /** 例文リスト. */
  examples: string[];
};
