import VocabularyWordModifyForm from "@/components/vocabulary/word/form/modify/VocabularyWordModifyForm";
import { AuthContext } from "@/context/auth/AuthProvider";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const VocabularyWordModifyFormPage = () => {
  const router = useRouter();
  const wordId = router.query["word_id"];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return;
  }, [wordId]);

  return (
    <div>
      <VocabularyWordModifyForm />
    </div>
  );
};

export default VocabularyWordModifyFormPage;
