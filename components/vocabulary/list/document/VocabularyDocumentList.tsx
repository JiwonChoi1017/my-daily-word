import { Document } from "@/types/Document";
import React from "react";
import VocabularyDocument from "./VocabularyDocument";

const VocabularyDocumentList: React.FC<{ documentList: Document[] }> = ({
  documentList,
}) => {
  return (
    <div>
      <ul>
        {documentList.map((document) => {
          return (
            <VocabularyDocument
              key={document.id}
              id={document.id}
              title={document.title}
              description={document.description}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default VocabularyDocumentList;
