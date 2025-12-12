import DefaultError from "@/components/error/DefaultError";
import MainLayout from "@/components/layout/MainLayout";

/**
 * 500エラー画面.
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
