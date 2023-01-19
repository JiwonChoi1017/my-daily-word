import React, { useRef } from "react";

const VocabularyDocumentForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form>
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
