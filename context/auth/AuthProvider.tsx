import React, { useEffect, useState, createContext } from "react";
import {
  AuthErrorCodes,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authService } from "firebase-config";
import { ErrorInfo } from "../../types/Error";
import { v4 as uuidv4 } from "uuid";

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
  currentUser: User | undefined;
  currentUserId: string | undefined;
};

export const AuthContext = createContext<UserInfoContext>(
  {} as UserInfoContext
);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // 現在のユーザー
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  // 現在のユーザーid
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(
    undefined
  );
  // ログインイベントハンドラ
  const signInHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;

    return await signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .then((user) => {
        setCurrentUser(user);
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
        setCurrentUser(undefined);
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
      setCurrentUser(undefined);

      if (!localStorage.getItem("uuid")) {
        localStorage.setItem("uuid", uuidv4());
      }
      const localStorageUuid = localStorage.getItem("uuid") ?? undefined;
      setCurrentUserId(localStorageUuid);
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // ユーザー情報が存在する場合
      if (user) {
        setCurrentUser(user);
        setCurrentUserId(user.uid);
        return;
      }

      if (!localStorage.getItem("uuid")) {
        localStorage.setItem("uuid", uuidv4());
      }
      const localStorageUuid = localStorage.getItem("uuid") ?? undefined;
      setCurrentUserId(localStorageUuid);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInHandler,
        signUpHandler,
        signOutHandler,
        currentUser,
        currentUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
