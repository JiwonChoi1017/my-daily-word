export type Book = {
  id: string;
  title: string;
  description: string;
};

export type Word = {
  id: string;
  word: string;
  pronunciation: string;
  meanings: Meaning[];
};

export type Meaning = {
  meaning: string;
  examples: string[];
};
