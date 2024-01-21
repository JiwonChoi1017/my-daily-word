import React from "react";
import classes from "@/styles/UserForm.module.css";

/** Props. */
interface Props {
  /** 子要素. */
  children: React.ReactNode;
}

/**
 * ユーザフォーム.
 *
 * @param {Props} props
 * @returns {JSX.Element} ユーザフォーム.
 */
const UserForm = ({ children }: Props): JSX.Element => {
  return (
    <div className={classes.userformWrap}>
      <div className={classes.userform}>{children}</div>
    </div>
  );
};

export default UserForm;
