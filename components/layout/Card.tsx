import React from "react";
import classes from "../../styles/Card.module.css";

/**
 * カード.
 *
 * @param {React.ReactNode} (任意)children.
 * @returns {JSX.Element} カード.
 */
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
