import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import VocabularyDocumentList from "@/components/vocabulary/list/document/VocabularyDocumentList";
import { authService } from "@/firebase-config";
import { Document } from "@/types/Document";

const VocabularyDocumentListPage = () => {
  const [documentList, setDocumentList] = useState<Document[]>([]);

  useEffect(() => {
    const user = authService.currentUser;
    const api = user
      ? `https://my-own-vocabulary-default-rtdb.firebaseio.com/${user.uid}.json`
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
  }, []);

  return (
    <MainLayout>
      <h1>Vocabulary Document List Page</h1>
      <Link href="/vocabulary/form/document">Add New Document</Link>
      <VocabularyDocumentList documentList={documentList} />
    </MainLayout>
  );
};

export default VocabularyDocumentListPage;
