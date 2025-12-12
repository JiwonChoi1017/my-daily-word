import { Answer } from "@/types/Quiz";
import WordItem from "./WordItem";
import classes from "@/styles/vocabulary/quiz/WordList.module.css";

/** Props. */
interface Props {
  /** 単語帳id. */
  bookId: string;
  /** 単語リスト. */
  wordList: Answer[];
}

/**
 * 単語リスト.
 *
 * @param {Props} props
 */
const WordList = ({ bookId, wordList }: Props) => {
  return (
    <ul className={classes.wordListWrap}>
      {wordList.map((item, index) => (
        <WordItem key={index} bookId={bookId} item={item} index={index} />
      ))}
    </ul>
  );
};

export default WordList;
