import MainLayout from "@/components/layout/MainLayout";
import SignUpForm from "@/components/sign-up/SignUpForm";
import UserForm from "@/components/ui/UserForm";

/**
 * ユーザ登録画面.
 */
const SignUpPage = () => {
  return (
    <MainLayout showNavigation={false}>
      <UserForm>
        <SignUpForm />
      </UserForm>
    </MainLayout>
  );
};

export default SignUpPage;
