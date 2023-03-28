import React, { useEffect, useState, createContext } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { authService } from "firebase-config";
import { ErrorInfo } from "../../types/Error";

type UserInfo = {
  email: string;
  password: string;
};

type UserInfoContext = {
  signInHandler: (userInfo: UserInfo) => void;
  signUpHandler: (userInfo: UserInfo) => void;
  signOutHandler: () => void;
  currentUser: User | null;
  errorInfo: ErrorInfo | null;
  setErrorInfo: React.Dispatch<React.SetStateAction<ErrorInfo | null>>;
};

export const AuthContext = createContext<UserInfoContext>(
  {} as UserInfoContext
);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // 現在のユーザ
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // エラー情報
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  // ログインイベントハンドラ
  const signInHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;

    await signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        setErrorInfo({
          status: "success",
          code: 200,
          message: "",
        });
      })
      .catch((error) => {
        if (error.code === AuthErrorCodes.USER_DELETED) {
          setErrorInfo({
            status: "error",
            code: 404,
            message:
              "アカウントが存在しません。他のアカウントを入力してください。",
          });
          return;
        }

        if (
          error.code === AuthErrorCodes.INVALID_EMAIL ||
          error.code === AuthErrorCodes.INVALID_PASSWORD
        ) {
          setErrorInfo({
            status: "error",
            code: 404,
            message: "ログインできませんでした。もう一度試してください。",
          });
          return;
        }

        setErrorInfo({
          status: "error",
          code: 500,
          message: error.message,
        });
      });
  };

  const signUpHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;
    try {
      await createUserWithEmailAndPassword(authService, email, password);
    } catch (e) {
      //
    }
  };

  const signOutHandler = async () => {
    try {
      await signOut(authService);
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInHandler,
        signUpHandler,
        signOutHandler,
        currentUser,
        errorInfo,
        setErrorInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
