import { ERROR_STATUS } from "@/constants/constants";

/** エラー. */
export type ErrorInfo = {
  status: string;
  code: number;
  message: string;
};

/** エラーステータス. */
export type ErrorStatus = keyof typeof ERROR_STATUS;
