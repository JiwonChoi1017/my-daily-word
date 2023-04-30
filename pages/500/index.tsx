import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import DefaultError from "@/components/error/DefaultError";

/**
 * 500エラー画面.
 *
 * @returns {JSX.Element} 500エラー画面.
 */
const InternalServerErrorPage = () => {
  return (
    <MainLayout showNavigation={false}>
      <DefaultError
        errorCode="500"
        errorText="申し訳ありません。このページは表示できません。"
      />
    </MainLayout>
  );
};

export default InternalServerErrorPage;
