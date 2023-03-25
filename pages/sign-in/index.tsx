import MainLayout from "@/components/layout/MainLayout";
import SignInForm from "@/components/sign-in/SignInForm";
import React from "react";
import UserForm from "@/components/ui/UserForm";

/**
 * ログイン画面.
 *
 * @returns {JSX.Element} ログイン画面.
 */
const SignInPage = () => {
  return (
    <MainLayout showNavigation={false}>
      <UserForm>
        <SignInForm />
      </UserForm>
    </MainLayout>
  );
};

export default SignInPage;
