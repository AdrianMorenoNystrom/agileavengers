// Formats a variable such as 3.17 to 3h 10 min
export function formatTime(hours) {
  let totalMinutes = hours * 60;
  const totalHours = Math.floor(totalMinutes / 60);
  totalMinutes = Math.floor(totalMinutes % 60);

  const time =
    totalMinutes !== 0 ? `${totalHours}h ${totalMinutes}min` : `${totalHours}h`;

    return time;
}
