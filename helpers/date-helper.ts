/**
 * 日付関連ヘルパー.
 */
export class DateHelper {
  /**
   * 日付を文字列へ変換.
   *
   * @param {Date} date - 日付
   * @param {string} seperator - (任意) 区切り文字
   * @returns {string} 文字列へ変換された日付.
   */
  convertDateToString(date: Date, seperator = "") {
    const dateArray: number[] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ];
    // 日付に0をつけて文字列を結合
    const dateString = dateArray
      .map((date) => date.toString())
      .map((date) => date.padStart(2, "0"))
      .join(seperator);

    return dateString;
  }

  /**
   * 時間を文字列へ変換.
   *
   * @param {Date} date - 日付
   * @param {string} seperator - (任意) 区切り文字
   * @returns {string} 文字列へ変換された時間.
   */
  convertTimeToString(date: Date, seperator = "") {
    const timeArray: number[] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    // 時間に0をつけて文字列を結合
    const timeString = timeArray
      .map((date) => date.toString())
      .map((date) => date.padStart(2, "0"))
      .join(seperator);

    return timeString;
  }

  /**
   * 日付と時間を結合した文字列を生成.
   *
   * @param {Date} date - 日付
   * @returns {string} 結合された日付と時間.
   */
  createDateTimeString(date: Date) {
    const dateString = this.convertDateToString(date);
    const timeString = this.convertTimeToString(date);

    return `${dateString}${timeString}`;
  }
}
