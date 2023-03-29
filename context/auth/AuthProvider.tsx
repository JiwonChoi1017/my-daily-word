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

// ユーザー情報
type UserInfo = {
  email: string;
  password: string;
};
// ユーザー情報コンテキスト
type UserInfoContext = {
  signInHandler: (userInfo: UserInfo) => Promise<ErrorInfo>;
  signUpHandler: (userInfo: UserInfo) => Promise<ErrorInfo>;
  signOutHandler: () => void;
  currentUser: User | null;
};

export const AuthContext = createContext<UserInfoContext>(
  {} as UserInfoContext
);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // 現在のユーザー
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // ログインイベントハンドラ
  const signInHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;

    return await signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        return {
          status: "success",
          code: "",
          message: "",
        };
      })
      .catch((error) => {
        const errorCode: string = error.code ?? "";
        const errorMsg: string = error.message ?? "";
        if (errorCode === AuthErrorCodes.USER_DELETED) {
          return {
            status: "error",
            code: errorCode,
            message:
              "アカウントが存在しません。他のアカウントを入力してください。",
          };
        }

        if (
          errorCode === AuthErrorCodes.INVALID_EMAIL ||
          errorCode === AuthErrorCodes.INVALID_PASSWORD
        ) {
          return {
            status: "error",
            code: errorCode,
            message: "ログインできませんでした。もう一度試してください。",
          };
        }

        return {
          status: "error",
          code: errorCode,
          message: errorMsg,
        };
      });
  };
  // ユーザー登録イベントハンドラ
  const signUpHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;
    return await createUserWithEmailAndPassword(authService, email, password)
      .then(() => {
        return {
          status: "success",
          code: "",
          message: "",
        };
      })
      .catch((error) => {
        const errorCode: string = error.code ?? "";
        const errorMsg: string = error.message ?? "";
        if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
          return {
            status: "error",
            code: errorCode,
            message: "有効なメールアドレスを入力してください。",
          };
        }

        if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
          return {
            status: "error",
            code: errorCode,
            message: "入力したメールアドレスはすでに存在します。",
          };
        }

        if (errorCode === AuthErrorCodes.INVALID_PASSWORD) {
          return {
            status: "error",
            code: errorCode,
            message: "有効なパスワードを入力してください。",
          };
        }

        if (errorCode === AuthErrorCodes.WEAK_PASSWORD) {
          return {
            status: "error",
            code: errorCode,
            message: "6文字以上の文字を入力してください。",
          };
        }

        return {
          status: "error",
          code: errorCode,
          message: errorMsg,
        };
      });
  };
  // ログアウトイベントハンドラ
  const signOutHandler = async () => {
    await signOut(authService).then(() => {
      setCurrentUser(null);
    });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
