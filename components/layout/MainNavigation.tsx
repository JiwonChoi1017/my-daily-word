import { AuthContext } from "@/context/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const MainNavigation = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const { signOutHandler, currentUser } = useContext(AuthContext);
  const router = useRouter();

  const onSignOutHandler = async () => {
    await signOutHandler();
    router.push("/");
  };

  const signInLink = isSignIn ? (
    <button onClick={onSignOutHandler}>ログアウト</button>
  ) : (
    <Link href="/sign-in">ログイン</Link>
  );

  useEffect(() => {
    setIsSignIn(!!currentUser);
  }, [currentUser]);

  return (
    <header>
      <div>
        <ul>
          <li>{signInLink}</li>
          <li>
            <Link href="/vocabulary/list">List</Link>
          </li>
          <li>
            <Link href="/vocabulary/quiz/quiz-id">Quiz</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
