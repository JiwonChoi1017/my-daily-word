import { ERROR_STATUS } from "@/constants/constants";

/** エラー. */
export type ErrorInfo = {
  /** ステータス. */
  status: string;
  /** コード. */
  code: string;
  /** メッセージ. */
  message: string;
};

/** エラーステータス. */
export type ErrorStatus = keyof typeof ERROR_STATUS;
