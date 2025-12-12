import Card from "../ui/Card";

/** Props. */
interface Props {
  /** メッセージ. */
  message: string;
}

/**
 * 単語が存在しない.
 *
 * @param {Props} props
 */
const NotFoundWord = ({ message }: Props) => {
  return (
    <Card isError={true}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </Card>
  );
};

export default NotFoundWord;
