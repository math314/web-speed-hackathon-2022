/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  // check date in JST
  const ret = new Date(dateLeft).toDateString() == new Date(dateRight).toDateString();
  return ret;
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const time = new Date(ts);
  const h = time.getHours().toString();
  const m = time.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};

/**
 * @param {string} closeAtStr
 * @param {Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAtStr, now = new Date()) => {
  const closeAtTime = Date.parse(closeAtStr);
  const nowTime = now.getTime();
  if (closeAtTime < nowTime) {
    return "投票締切";
  }

  const minutes = Math.floor((closeAtTime - nowTime) / (60 * 1000));

  if (minutes > 120) {
    return "投票受付中";
  } else {
    return `締切${minutes}分前`;
  }
};
