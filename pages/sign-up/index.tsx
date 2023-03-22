import MainLayout from "@/components/layout/MainLayout";
import UserForm from "@/components/layout/UserForm";
import SignUpForm from "@/components/sign-up/SignUpForm";

import React from "react";

/**
 * ユーザ登録画面.
 *
 * @returns {JSX.Element} ユーザ登録画面.
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
