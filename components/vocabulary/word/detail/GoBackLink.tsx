import { GoBackIcon } from "@/components/icon/Icon";
import Link from "next/link";
import React from "react";
import classes from "@/styles/GoBackLink.module.css";

/** Props. */
interface Props {
  /** ローディング中か. */
  isLoading: boolean;
  /** url. */
  url: string;
}

/**
 * 一覧画面へ戻るリンク.
 *
 * @param {Props} props
 * @returns {JSX.Element} 一覧画面へ戻るリンク.
 */
const GoBackLink = ({ isLoading, url }: Props) => {
  // 読み込む中であれば、空要素をリターン
  if (isLoading) {
    return <></>;
  }

  return (
    <Link href={url} className={classes.goBackLink}>
      <GoBackIcon />
      単語リストへ戻る
    </Link>
  );
};

export default GoBackLink;
