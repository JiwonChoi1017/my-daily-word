import React from "react";
import classes from "@/styles/Title.module.css";

/** Props. */
interface Props {
  /** タイトル. */
  title: string;
  /** (任意)サブタイトル. */
  subtitle?: string;
}

/**
 * タイトル.
 *
 * @param {Props} props.
 * @returns {JSX.Element} タイトル.
 */
const Title = ({ title, subtitle }: Props) => {
  return (
    <div className={classes.title__wrap}>
      <span className={classes.title}>{title}</span>
      {subtitle && <span className={classes.title}>{subtitle}</span>}
    </div>
  );
};

export default Title;
