import React from "react";
import classes from "../../styles/InputForm.module.css";

/**
 * 入力フォーム.
 *
 * @param {React.ReactNode} children - (任意)children.
 * @returns {JSX.Element} 入力フォーム.
 */
const InputForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={classes.inputform}>{children}</div>;
};

export default InputForm;
