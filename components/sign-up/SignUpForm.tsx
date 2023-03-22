import React, { useContext, useRef } from "react";
import { AuthContext } from "@/context/auth/AuthProvider";
import { useRouter } from "next/router";

/**
 * ユーザ登録フォーム.
 *
 * @returns {JSX.Element} ユーザ登録フォーム.
 */
const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { signUpHandler } = useContext(AuthContext);

  // 送信イベント
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: バリデーションチェックを入れる
    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    await signUpHandler({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    router.push("/sign-in");
  };

  // キャンセルイベント
  const onCancelHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // ログイン画面に戻る
    router.push("/sign-in");
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        onSubmitHandler(e);
      }}
    >
      <div>
        {/* htmlFor: htmlタグの属性forのこと. */}
        {/* labelに付与することで、同じ内容のid属性を持つ要素を関連付けられる. */}
        <label htmlFor="email">メールアドレス</label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          placeholder="メールアドレスを入力してください。"
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          placeholder="パスワードを入力してください。"
        />
      </div>
      <button type="submit" className="first">
        登録
      </button>
      <button
        className="second"
        onClick={(e: React.MouseEvent) => {
          onCancelHandler(e);
        }}
      >
        キャンセル
      </button>
    </form>
  );
};

export default SignUpForm;
