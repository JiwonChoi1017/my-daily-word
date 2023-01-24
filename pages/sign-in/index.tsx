import SignInForm from "@/components/sign-in/SignInForm";
import Link from "next/link";

import React from "react";

const SignUpPage = () => {
  return (
    <>
      <h1>ログイン</h1>
      <SignInForm />
      <Link href="/sign-up">ユーザ登録</Link>
    </>
  );
};

export default SignUpPage;
