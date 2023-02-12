import React, { useRef } from "react";

const VocabularyWordSearchBox: React.FC<{
  filterWordList: (keyword: string) => void;
}> = ({ filterWordList }) => {
  const keywordRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = () => {
    if (!keywordRef.current) return;

    const keywordValue = keywordRef.current.value;

    filterWordList(keywordValue);
  };

  return (
    <div>
      <input ref={keywordRef} type="text" onChange={onChangeHandler} />
    </div>
  );
};

export default VocabularyWordSearchBox;
