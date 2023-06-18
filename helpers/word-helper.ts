import {
  DataSnapshot,
  endBefore,
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
} from "firebase/database";

import { VOCABULARY_LIST_RESULTS } from "@/constants/constants";
import { db } from "@/firebase-config";

/** 最後のデータ. */
interface EndValue {
  /** 作成日時. */
  createdAt: string;
  /** キー. */
  key: string;
}

/**
 * 単語関連ヘルパー.
 */
export class WordHelper {
  /**
   * 単語リストを取得.
   *
   * @param {string} currentUserId - 現在のユーザーid
   * @param {string} bookId - 単語帳id
   * @param {EndValue} endValue - 最後のデータ
   * @returns {Promise<DataSnapshot>} 単語リストのスナップショット.
   */
  async fetchWordList(
    currentUserId: string,
    bookId: string,
    endValue: EndValue
  ): Promise<DataSnapshot> {
    const path = `users/${currentUserId}/${bookId}/words`;
    const wordsRef = ref(db, path);
    const fetchWordQuery =
      endValue.createdAt && endValue.key
        ? query(
            wordsRef,
            orderByChild("createdAt"),
            endBefore(endValue.createdAt, endValue.key),
            limitToLast(VOCABULARY_LIST_RESULTS)
          )
        : query(
            wordsRef,
            orderByChild("createdAt"),
            limitToLast(VOCABULARY_LIST_RESULTS)
          );

    return await get(fetchWordQuery);
  }

  /**
   * 単語を絞り込む.
   *
   * @param {string} currentUserId - 現在のユーザーid
   * @param {string} bookId - 単語帳id
   * @returns {Promise<DataSnapshot>} 単語リストのスナップショット.
   */
  async filterWordList(
    currentUserId: string,
    bookId: string
  ): Promise<DataSnapshot> {
    const path = `users/${currentUserId}/${bookId}/words`;
    const wordsRef = ref(db, path);

    return await get(wordsRef);
  }

  /**
   * キーワードを含めているか.
   *
   * @param {string} items - 単語リスト
   * @param {string} keyword - キーワード
   * @returns {boolean} キーワードを含めているか.
   */
  containsKeyword(items: string[], keyword: string): boolean {
    const filteredList = items.filter((item) => item.startsWith(keyword));
    return !!filteredList.length;
  }

  /**
   * キーワードが一致するか.
   *
   * @param {string} items - 単語リスト
   * @param {string} keyword - キーワード
   * @returns {boolean} キーワードが一致するか.
   */
  isEqualKeyword(items: string[], keyword: string): boolean {
    const filteredList = items.filter((item) => item === keyword);
    return !!filteredList.length;
  }
}
