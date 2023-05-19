import React from "react";
import classes from "@/styles/Examples.module.css";

/** Props. */
interface Props {
  /** 例文. */
  examples: string[];
}

/**
 * 例文.
 *
 * @param {Props} props.
 * @returns {JSX.Element} 例文.
 */
const Examples = ({ examples }: Props) => {
  // 例文が存在しない場合、早期リターン
  if (!examples) {
    return <></>;
  }

  return (
    <ul className={classes.exampleWrap}>
      {examples.map((example, index) => {
        return (
          <li key={`${example}_${index}`} className={classes.example}>
            {example}
          </li>
        );
      })}
    </ul>
  );
};

export default Examples;
