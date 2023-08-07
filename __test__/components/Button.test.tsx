import { render, screen } from "@testing-library/react";

import { Button } from "../../components/ui/Button";
import React from "react";

describe("Buttonコンポーネント", () => {
  test("ボタン：ボタンの文言が想定通りか", () => {
    // Buttonコンポーネントをレンダリング
    render(
      <Button
        className="button"
        text={"Button1"}
        clickHandler={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
        }}
      />
    );
    // getByText(): html要素内のテキスト内容を取得
    // toBeInTheDocument(): ドキュメント内に要素が存在するかを確認
    expect(screen.getByText("Button1")).toBeInTheDocument();
  });
});
