import React from "react";
import Card from "../ui/Card";

/**
 * Not Found Word.
 *
 * @returns {JSX.Element} Not Found Word.
 */
const NotFoundWord = () => {
  return (
    <Card isError={true}>
      <div>
        単語が見つかりませんでした。
        <br />
        新しい単語を追加してください。
      </div>
    </Card>
  );
};

export default NotFoundWord;
