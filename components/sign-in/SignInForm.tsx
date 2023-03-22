import React, { useContext, useRef } from "react";
import { AuthContext } from "@/context/auth/AuthProvider";
import { useRouter } from "next/router";

/**
 * ログインフォーム.
 *
 * @returns {JSX.Element} ログインフォーム.
 */
const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { signInHandler } = useContext(AuthContext);

  // 送信イベント
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(): submitイベントの発生元であるフォームが持つデフォルトの動作をキャンセルするメソッド.
    // フォームが持つデフォルトの動作とは、フォームの内容を指定したURLへ送信するという動作のことをいう.
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまう.
    // そのため、e.preventDefault()を呼び出し、デフォルトの動作をキャンセルする。
    e.preventDefault();
    // TODO: バリデーションチェックを入れる
    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    await signInHandler({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    router.push("/vocabulary/list?page=1");
  };
  // ユーザ登録ボタンクリックイベント
  const onClickSignUpButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // ユーザ登録画面に遷移
    router.push("/sign-up");
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        onSubmitHandler(e);
      }}
    >
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input ref={emailRef} id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
        />
      </div>
      <button type="submit" className="first">
        ログイン
      </button>
      <button
        className="second"
        onClick={(e: React.MouseEvent) => {
          onClickSignUpButtonHandler(e);
        }}
      >
        新規登録
      </button>
    </form>
  );
};

export default SignInForm;
