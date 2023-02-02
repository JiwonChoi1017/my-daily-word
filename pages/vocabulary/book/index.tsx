import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import VocabularyDocumentList from "@/components/vocabulary/list/document/VocabularyDocumentList";
import { Document } from "@/types/Document";
import { AuthContext } from "@/auth/AuthProvider";

const VocabularyBookListPage = () => {
  const [documentList, setDocumentList] = useState<Document[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const api = currentUser
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${currentUser.uid}.json`
      : "";
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const documentList = [];
        for (const key in data) {
          const document = {
            id: key,
            ...data[key],
          };
          documentList.push(document);
        }
        setDocumentList(documentList);
      });
  }, [currentUser]);

  return (
    <MainLayout>
      <h1>Vocabulary Book List Page</h1>
      <Link href="/vocabulary/book/form">Add New Book</Link>
      <VocabularyDocumentList documentList={documentList} />
    </MainLayout>
  );
};

export default VocabularyBookListPage;
