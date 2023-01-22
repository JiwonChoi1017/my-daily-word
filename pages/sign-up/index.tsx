import SignUpForm from "@/components/sign-up/SignUpForm";
import { authService, createUserWithEmailAndPassword } from "@/firebase-config";

import { useRouter } from "next/router";
import React from "react";

const SignUpPage = () => {
  const router = useRouter();
  const onAddUser = async (userData: { email: string; password: string }) => {
    const { email, password } = userData;
    await createUserWithEmailAndPassword(authService, email, password);
    router.push("/login");
  };

  return (
    <>
      <h1>ユーザ登録</h1>
      <SignUpForm onAddUser={onAddUser} />
    </>
  );
};

export default SignUpPage;
