import React from "react";
import Card from "../ui/Card";

/**
 * 単語帳リストのゼロマッチ.
 *
 * @returns {JSX.Element} 単語帳リストのゼロマッチ.
 */
const NotFoundList = () => {
  return (
    <Card isError={true}>
      <div>
        単語帳が見つかりませんでした。
        <br />
        新しい単語帳を追加してください。
      </div>
    </Card>
  );
};

export default NotFoundList;
