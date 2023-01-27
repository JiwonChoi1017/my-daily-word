import React, { useRef } from "react";

const VocabularyDocumentForm: React.FC<{
  onAddDocumentHandler: (documentInfo: {
    title: string;
    description: string;
  }) => void;
}> = ({ onAddDocumentHandler }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleRef.current || !descriptionRef.current) {
      return;
    }

    onAddDocumentHandler({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    });
  };

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        onSubmitHandler(e);
      }}
    >
      <div>
        <label htmlFor="title">title</label>
        <input ref={titleRef} type="text" id="title" required />
      </div>
      <div>
        <label htmlFor="description">description</label>
        <textarea ref={descriptionRef} id="description" rows={5} required />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default VocabularyDocumentForm;
