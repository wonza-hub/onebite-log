/**
 * 특정 시점으로부터 경과 시간 반환
 * @param time
 * @returns 방금 전, N분 전, N시간 전, N일 전 등의 경과 시간
 */
export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (secondDiff < 60) return "방금 전";

  const minuteDiff = Math.floor(secondDiff / 60);
  if (minuteDiff < 60) return `${minuteDiff}분 전`;

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff}일 전`;
}
