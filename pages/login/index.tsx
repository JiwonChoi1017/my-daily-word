import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <h1>Login Page</h1>
      <Link href="/sign-up">ユーザ登録</Link>
    </>
  );
};

export default LoginPage;
