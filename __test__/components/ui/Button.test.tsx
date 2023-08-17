import {
  Button,
  DoubleButton,
  DuplicateCheckButton,
  ErrorPageButton,
} from "@/components/ui/Button";
import { render, screen } from "@testing-library/react";

import React from "react";
import userEvent from "@testing-library/user-event";

describe("Buttonのテスト", () => {
  const mockOnClick = jest.fn();
  const mockOnClickForSecondButton = jest.fn();

  // スナップショットテスト:
  // https://jestjs.io/ja/docs/snapshot-testing
  test("Button: スナップショットテスト", () => {
    // Buttonコンポーネントをレンダリング
    const { container } = render(
      <Button
        className="ButtonClass1"
        text={"Button1"}
        clickHandler={mockOnClick}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("Button: 文言が想定通りか", () => {
    // Buttonコンポーネントをレンダリング
    render(
      <Button
        className="ButtonClass1"
        text={"Button1"}
        clickHandler={mockOnClick}
      />
    );

    // getByText(): html要素内のテキスト内容を取得
    // toBeInTheDocument(): ドキュメント内に要素が想定通りかを確認
    expect(screen.getByText("Button1")).toBeInTheDocument();
  });

  test("Button: cssクラスが想定通りか", async () => {
    // Buttonコンポーネントをレンダリング
    const { container } = render(
      <Button
        className="ButtonClass1"
        text={"Button1"}
        clickHandler={mockOnClick}
      />
    );

    expect(container.firstChild).toHaveClass("ButtonClass1");
  });

  test("Button: onClickに渡した関数が呼ばれるか", async () => {
    // Buttonコンポーネントをレンダリング
    render(
      <Button className="button" text={"Button1"} clickHandler={mockOnClick} />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("DoubleButton: スナップショットテスト", () => {
    // DoubleButtonコンポーネントをレンダリング
    const { container } = render(
      <DoubleButton
        button={{
          first: {
            text: "DoubleButton1",
            className: "DoubleButtonClass1",
            clickHandler: mockOnClick,
          },
          second: {
            text: "DoubleButton2",
            className: "DoubleButtonClass2",
            clickHandler: mockOnClickForSecondButton,
          },
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test("DoubleButton: 文言が想定通りか", () => {
    // DoubleButtonコンポーネントをレンダリング
    render(
      <DoubleButton
        button={{
          first: {
            text: "DoubleButton1",
            className: "DoubleButtonClass1",
            clickHandler: mockOnClick,
          },
          second: {
            text: "DoubleButton2",
            className: "DoubleButtonClass2",
            clickHandler: mockOnClickForSecondButton,
          },
        }}
      />
    );

    const doubleButton = screen.getAllByRole("button") as HTMLButtonElement[];

    expect(doubleButton[0].textContent).toEqual("DoubleButton1");
    expect(doubleButton[1].textContent).toEqual("DoubleButton2");
  });

  test("DoubleButton: cssクラスが想定通りか", () => {
    // DoubleButtonコンポーネントをレンダリング
    render(
      <DoubleButton
        button={{
          first: {
            text: "DoubleButton1",
            className: "DoubleButtonClass1",
            clickHandler: mockOnClick,
          },
          second: {
            text: "DoubleButton2",
            className: "DoubleButtonClass2",
            clickHandler: mockOnClickForSecondButton,
          },
        }}
      />
    );

    const doubleButton = screen.getAllByRole("button") as HTMLButtonElement[];

    expect(doubleButton[0].classList.contains("DoubleButtonClass1")).toBe(true);
    expect(doubleButton[1].classList.contains("DoubleButtonClass2")).toBe(true);
  });

  test("DoubleButton: onClickに渡した関数が呼ばれるか", async () => {
    // DoubleButtonコンポーネントをレンダリング
    render(
      <DoubleButton
        button={{
          first: {
            text: "DoubleButton1",
            className: "DoubleButtonClass1",
            clickHandler: mockOnClick,
          },
          second: {
            text: "DoubleButton2",
            className: "DoubleButtonClass2",
            clickHandler: mockOnClickForSecondButton,
          },
        }}
      />
    );

    const doubleButton = screen.getAllByRole("button") as HTMLButtonElement[];
    await userEvent.click(doubleButton[0]);
    await userEvent.click(doubleButton[1]);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClickForSecondButton).toHaveBeenCalled();
  });

  test("DuplicateCheckButton: スナップショットテスト", () => {
    // DuplicateCheckButtonコンポーネントをレンダリング
    const { container } = render(
      <DuplicateCheckButton isDisabled={false} clickHandler={mockOnClick} />
    );

    expect(container).toMatchSnapshot();
  });

  test("DuplicateCheckButton: 文言が想定通りか", () => {
    // DuplicateCheckButtonコンポーネントをレンダリング
    render(
      <DuplicateCheckButton isDisabled={false} clickHandler={mockOnClick} />
    );

    expect(screen.getByText("重複チェック")).toBeInTheDocument();
  });

  test("DuplicateCheckButton: cssクラスが想定通りか", async () => {
    // DuplicateCheckButtonコンポーネントをレンダリング
    const { container } = render(
      <DuplicateCheckButton isDisabled={false} clickHandler={mockOnClick} />
    );

    expect(container.firstChild).toHaveClass("duplicateCheckButton");
  });

  test("ErrorPageButton: スナップショットテスト", () => {
    // ErrorPageButtonコンポーネントをレンダリング
    const { container } = render(
      <ErrorPageButton text={"ErrorPageButton1"} clickHandler={mockOnClick} />
    );

    expect(container).toMatchSnapshot();
  });

  test("ErrorPageButton: 文言が想定通りか", () => {
    // ErrorPageButtonコンポーネントをレンダリング
    render(
      <ErrorPageButton text={"ErrorPageButton1"} clickHandler={mockOnClick} />
    );

    expect(screen.getByText("ErrorPageButton1")).toBeInTheDocument();
  });

  test("ErrorPageButton: cssクラスが想定通りか", async () => {
    // ErrorPageButtonコンポーネントをレンダリング
    const { container } = render(
      <ErrorPageButton text={"ErrorPageButton1"} clickHandler={mockOnClick} />
    );

    expect(container.firstChild).toHaveClass("button__wrap marginTop20");
  });
});
