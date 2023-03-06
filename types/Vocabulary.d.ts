export type Book = {
  id: string;
  title: string;
  word: string;
  meaning: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
  isFavorite: boolean;
};

export type Word = {
  id: string;
  word: string;
  pronunciation: string;
  meanings: Meaning[];
  isMemorized: boolean;
  createdAt: string;
  modifiedAt: string;
};

export type Meaning = {
  meaning: string;
  examples: string[];
};
