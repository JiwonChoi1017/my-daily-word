import Card from "@/components/ui/Card";
import React from "react";
import { render } from "@testing-library/react";

describe("Cardのテスト", () => {
  test("Card: スナップショットテスト", () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });
});
