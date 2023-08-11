import {
  Button,
  DoubleButton,
  DuplicateCheckButton,
  ErrorPageButton,
} from "../../../components/ui/Button";
import { render, screen } from "@testing-library/react";

import React from "react";
import userEvent from "@testing-library/user-event";

describe("Buttonコンポーネント", () => {
  const mockOnClick = jest.fn();
  const mockOnClickForSecondButton = jest.fn();

  test("ボタン：文言が想定通りか", () => {
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

  test("ボタン：cssクラスが想定通りか", async () => {
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

  test("ボタン：onClickに渡した関数が呼ばれるか", async () => {
    // Buttonコンポーネントをレンダリング
    render(
      <Button className="button" text={"Button1"} clickHandler={mockOnClick} />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("ダブルボタン：文言が想定通りか", () => {
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

  test("ダブルボタン：cssクラスが想定通りか", () => {
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

  test("ボタン：onClickに渡した関数が呼ばれるか", async () => {
    // Buttonコンポーネントをレンダリング
    render(
      <Button className="button" text={"Button1"} clickHandler={mockOnClick} />
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("重複チェックボタン：文言が想定通りか", () => {
    // DuplicateCheckButtonコンポーネントをレンダリング
    render(
      <DuplicateCheckButton isDisabled={false} clickHandler={mockOnClick} />
    );

    expect(screen.getByText("重複チェック")).toBeInTheDocument();
  });

  test("重複チェックボタン：cssクラスが想定通りか", async () => {
    // DuplicateCheckButtonコンポーネントをレンダリング
    const { container } = render(
      <DuplicateCheckButton isDisabled={false} clickHandler={mockOnClick} />
    );

    expect(container.firstChild).toHaveClass("duplicateCheckButton");
  });

  test("エラーページのボタン：文言が想定通りか", () => {
    // ErrorPageButtonコンポーネントをレンダリング
    render(
      <ErrorPageButton text={"ErrorPageButton1"} clickHandler={mockOnClick} />
    );

    expect(screen.getByText("ErrorPageButton1")).toBeInTheDocument();
  });

  test("エラーページのボタン：cssクラスが想定通りか", async () => {
    // ErrorPageButtonコンポーネントをレンダリング
    const { container } = render(
      <ErrorPageButton text={"ErrorPageButton1"} clickHandler={mockOnClick} />
    );

    expect(container.firstChild).toHaveClass("button__wrap marginTop20");
  });
});
