import React, { useEffect, useState, createContext } from "react";
import { User } from "firebase/auth";
import {
  authService,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase-config";

type UserInfo = {
  email: string;
  password: string;
};

type UserInfoContext = {
  signInHandler: (userInfo: UserInfo) => void;
  signUpHandler: (userInfo: UserInfo) => void;
  currentUser: User | null;
};

export const AuthContext = createContext<UserInfoContext>(
  {} as UserInfoContext
);

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signInHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;
    try {
      await signInWithEmailAndPassword(authService, email, password);
    } catch (e) {
      //
    }
  };

  const signUpHandler = async (userInfo: UserInfo) => {
    const { email, password } = userInfo;
    try {
      await createUserWithEmailAndPassword(authService, email, password);
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    authService.onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInHandler,
        signUpHandler,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
