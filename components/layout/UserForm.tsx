import React from "react";
import classes from "../../styles/UserForm.module.css";

/**
 * ユーザフォーム.
 *
 * @param {React.ReactNode} children - (任意)children.
 * @returns {JSX.Element} ユーザフォーム.
 */
const UserForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={classes.userform}>{children}</div>;
};

export default UserForm;
