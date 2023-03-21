import React from "react";
import classes from "../../styles/Loader.module.css";

/**
 * 読み込み中アニメーション.
 *
 * @returns {JSX.Element} 読み込み中アニメーション.
 */
const Loader = () => {
  return (
    <div className={classes.loader__wrap}>
      <span className={classes.loader} />
    </div>
  );
};

export default Loader;
