// 1080 -> "18:00"

export function convertMinutesToHourString(minutesParam: number){
  const hours = Math.floor(minutesParam / 60);
  const minutes = (minutesParam % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}