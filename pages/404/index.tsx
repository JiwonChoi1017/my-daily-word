import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import DefaultError from "@/components/error/DefaultError";

/**
 * 404エラー画面.
 *
 * @returns {JSX.Element} 404エラー画面.
 */
const NotFoundErrorPage = () => {
  return (
    <MainLayout showNavigation={false}>
      <DefaultError
        errorCode="404"
        errorText="お探しのページは見つかりませんでした。"
      />
    </MainLayout>
  );
};

export default NotFoundErrorPage;
