import React from "react";
import classes from "@/styles/InputForm.module.css";

/** Props. */
interface Props {
  /** 子要素. */
  children: React.ReactNode;
}

/**
 * 入力フォーム.
 *
 * @param {Props} props
 * @returns {JSX.Element} 入力フォーム.
 */
const InputForm = React.memo(({ children }: Props) => {
  return (
    <div className={classes.inputformWrap}>
      <div className={classes.inputform}>{children}</div>
    </div>
  );
});

InputForm.displayName = "InputForm";

export default InputForm;
