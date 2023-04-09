import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "@/context/auth/AuthProvider";
import { useRouter } from "next/router";
import { Button } from "../ui/Button";
import { ErrorInfo } from "@/types/Error";

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
  // エラー情報
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  // ルーター
  const router = useRouter();
  // ログインイベントハンドラ
  const { signInHandler } = useContext(AuthContext);
  // 送信イベント
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(): submitイベントの発生元であるフォームが持つデフォルトの動作をキャンセルするメソッド.
    // フォームが持つデフォルトの動作とは、フォームの内容を指定したURLへ送信するという動作のことをいう.
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまう.
    // そのため、e.preventDefault()を呼び出し、デフォルトの動作をキャンセルする。
    e.preventDefault();
    // 入力漏れがある場合、何もせずリターン
    if (!emailRef.current || !passwordRef.current) {
      return;
    }
    // ログインイベントを発火させ、エラー情報を取得
    const errorInfo = await signInHandler({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    setErrorInfo(errorInfo);
    // ログインに成功した場合、単語帳リストへ移動
    if (errorInfo && errorInfo.status === "success") {
      router.push("/vocabulary/list?page=1");
    }
  };
  // ユーザー登録ボタンクリックイベント
  const onClickSignUpButtonHandler = () => {
    // ユーザー登録画面に遷移
    router.push("/sign-up");
  };
  // 入力変更イベントハンドラ
  const onChangeInputHandler = () => {
    if (!emailRef.current || !passwordRef.current) return;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // 活性/非活性状態を更新
    setIsDisabled(!email || !password || password.length < 10);
  };
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
          type="text"
          // メールアドレスの長さについては下記を参考
          // https://blog.anderiens.com/entry/length-of-mail-address
          maxLength={254}
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
      <Button
        text="ログイン"
        className="first"
        isSubmit={true}
        isDisabled={isDisabled}
      />
      <Button
        text="新規登録"
        className="second"
        clickHandler={onClickSignUpButtonHandler}
      />
    </form>
  );
};

export default SignInForm;
