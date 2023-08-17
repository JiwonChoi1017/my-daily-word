import React from "react";
import Title from "@/components/ui/Title";
import { render } from "@testing-library/react";

describe("Titleのテスト", () => {
  test("Title: スナップショットテスト", () => {
    const { container } = render(<Title title="Title1" subtitle="SubTitle1" />);

    expect(container).toMatchSnapshot();
  });
});
