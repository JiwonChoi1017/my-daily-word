import DefaultError from "@/components/error/DefaultError";
import MainLayout from "@/components/layout/MainLayout";

/**
 * 404エラー画面.
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
