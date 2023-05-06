import Card from "../ui/Card";
import React from "react";

/** Props. */
interface Props {
  /** メッセージ. */
  message: string;
}

/**
 * 単語が存在しない.
 *
 * @param {Props} props
 * @returns {JSX.Element} 単語が存在しない.
 */
const NotFoundWord = ({ message }: Props) => {
  return (
    <Card isError={true}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </Card>
  );
};

export default NotFoundWord;
