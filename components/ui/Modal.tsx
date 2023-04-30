import React from "react";
import classes from "../../styles/Modal.module.css";
import { DoubleButton } from "./Button";

/** Props. */
interface Props {
  /** 表示するか. */
  show: boolean;
  /** テキスト. */
  text: string;
  /** 確認テキスト. */
  confirmText: string;
  /** キャンセルテキスト. */
  cancelText: string;
  /** 確認のクリックイベント. */
  onClickConfirm: () => void;
  /** キャンセルのクリックイベント. */
  onClickCancel: () => void;
}

/**
 * モーダル.
 *
 * @param {Props} Props.
 * @returns {JSX.Element} モーダル.
 */
const Modal = ({
  show,
  text,
  confirmText,
  cancelText,
  onClickConfirm,
  onClickCancel,
}: Props) => {
  if (!show) {
    return <></>;
  }

  return (
    <div className={classes.modalwrap}>
      <div className={classes.overlay} onClick={onClickCancel} />
      <div className={classes.modal}>
        <p>{text}</p>
        <DoubleButton
          button={{
            first: {
              className: "second__double__modal",
              text: cancelText,
              clickHandler: onClickCancel,
            },
            second: {
              className: "first__double__modal",
              text: confirmText,
              clickHandler: onClickConfirm,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
