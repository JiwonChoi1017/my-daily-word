import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/auth/AuthProvider";
import { useRouter } from "next/router";
import Button from "../layout/Button";

/**
 * ログインフォーム.
 *
 * @returns {JSX.Element} ログインフォーム.
 */
const SignInForm = () => {
  // 各入力項目のref
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // 活性/非活性状態
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // ルーター
  const router = useRouter();
  // エラー情報、ログインイベントハンドラ
  const { errorInfo, setErrorInfo, signInHandler } = useContext(AuthContext);
  // 送信イベント
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(): submitイベントの発生元であるフォームが持つデフォルトの動作をキャンセルするメソッド.
    // フォームが持つデフォルトの動作とは、フォームの内容を指定したURLへ送信するという動作のことをいう.
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまう.
    // そのため、e.preventDefault()を呼び出し、デフォルトの動作をキャンセルする。
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      return;
    }
    // ログインイベント発火
    await signInHandler({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    // ログインに成功した場合、単語帳リストへ移動
    if (errorInfo && errorInfo.status === "success") {
      router.push("/vocabulary/list?page=1");
    }
  };
  // ユーザ登録ボタンクリックイベント
  const onClickSignUpButtonHandler = () => {
    // ユーザ登録画面に遷移
    router.push("/sign-up");
  };
  // 入力変更イベントハンドラ
  const onChangeInputHandler = () => {
    if (!emailRef.current || !passwordRef.current) return;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // 活性/非活性状態を更新
    setIsDisabled(!email || !password);
  };

  useEffect(() => {
    setErrorInfo(null);
  }, []);

  // エラーメッセージ
  const errorMsg = errorInfo?.status === "error" && (
    <p className="errorMsg">{errorInfo.message}</p>
  );

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        onSubmitHandler(e);
      }}
    >
      {errorMsg}
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          onChange={onChangeInputHandler}
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          onChange={onChangeInputHandler}
        />
      </div>
      <Button text="ログイン" isSubmit={true} isDisabled={isDisabled} />
      <Button
        text="新規登録"
        className="second"
        clickHandler={onClickSignUpButtonHandler}
      />
    </form>
  );
};

export default SignInForm;
