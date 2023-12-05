/**
 *
 * @param openTime {number} - 영업 시작 시간(24시 형식)
 * @param closeTime  {number} - 영업 종료 시간(24시 형식)
 */
const getOpenStatus = (openTime: number, closeTime: number) => {
  const now = new Date();
  const nowHour = now.getHours();
  if (nowHour < openTime) {
    return false;
  }
  if (nowHour > closeTime) {
    return false;
  }
  return true;
};
export default getOpenStatus;
