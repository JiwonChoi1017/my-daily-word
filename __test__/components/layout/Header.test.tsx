import Header from "@/components/layout/Header";
import React from "react";
import { render } from "@testing-library/react";

describe("Headerのテスト", () => {
  test("Header: スナップショットテスト", () => {
    // const { container } = render(
    //   <Header
    //     showNavigation={false}
    //     showWordList={false}
    //     showQuiz={false}
    //     bookId="BookId1"
    //   />
    // );
    // expect(container).toMatchSnapshot();
  });

  test("ナビゲーション：単語帳リストに遷移するか", () => {});
});
