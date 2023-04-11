import React, { useEffect, useState } from "react";
import classes from "../../styles/ScrollToTopButton.module.css";
import { FaAngleUp } from "react-icons/fa";

/**
 * トップへボタン.
 *
 * @returns {JSX.Element} トップへボタン.
 */
const ScrollToTopButton = () => {
  // 表示するか
  const [show, setShow] = useState<boolean>(false);
  // ボタンをトグルするイベント
  const toggleButton = () => {
    const boundary = 100;
    const currentPos = window.scrollY;

    setShow(boundary <= currentPos);
  };

  useEffect(() => {
    // スクロールイベントを登録
    window.addEventListener("scroll", toggleButton);
    return () => {
      window.removeEventListener("scroll", toggleButton);
    };
  }, []);

  // トップへスクロールするイベント
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // クラス名
  const className = `${show ? classes.show : classes.hide} ${
    classes.scrollToTopButton
  }`;

  return (
    <div className={className}>
      <FaAngleUp className={classes.arrow} onClick={scrollToTop} />
    </div>
  );
};

export default ScrollToTopButton;
