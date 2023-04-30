import React from "react";
import Card from "../ui/Card";
import classes from "../../styles/DefaultError.module.css";
import { ErrorPageButton } from "../ui/Button";
import { useRouter } from "next/router";

/** Props. */
interface Props {
  /** (任意)エラーコード. */
  errorCode?: string;
  /** エラーテキスト. */
  errorText: string;
}

/**
 * デフォルトエラー.
 *
 * @param {Props} Props.
 * @returns {JSX.Element} デフォルトエラー.
 */
const DefaultError = ({ errorCode, errorText }: Props) => {
  // ルーター
  const router = useRouter();
  // トップページへ移動
  const moveToTopPage = () => {
    router.push("/");
  };

  return (
    <Card isError={true}>
      {errorCode && <h1 className={classes.errorCode}>{errorCode}</h1>}
      <div>{errorText}</div>
      <ErrorPageButton text="トップページへ" clickHandler={moveToTopPage} />
    </Card>
  );
};

export default DefaultError;
