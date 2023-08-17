import React from "react";
import SearchBox from "@/components/ui/SearchBox";
import { render } from "@testing-library/react";

describe("SearchBoxのテスト", () => {
  const mockRef = React.createRef<HTMLInputElement>();
  const mockOnChange = jest.fn();

  test("SearchBox: スナップショットテスト", () => {
    const { container } = render(
      <SearchBox keywordRef={mockRef} onChangeHandler={mockOnChange} />
    );

    expect(container).toMatchSnapshot();
  });
});
