import Loader from "@/components/layout/Loader";
import React from "react";
import { render } from "@testing-library/react";

describe("Loaderのテスト", () => {
  // Loaderコンポーネントをレンダリング
  test("Loader: スナップショットテスト", () => {
    const { container } = render(<Loader />);

    expect(container).toMatchSnapshot();
  });
});
