// Formats a variable such as 3.17 to: 3h. Or if formatToHoursOnly is false to: 3h 10 min
export function formatTime(hours, formatToHoursOnly) {
  let totalMinutes = hours * 60;

  if (formatToHoursOnly) {
    return `${Math.round(hours)}h`;
  }

  const totalHours = Math.floor(totalMinutes / 60);
  totalMinutes = Math.floor(totalMinutes % 60);

  if (totalHours !== 0 && totalMinutes !== 0) {
    return `${totalHours}h ${totalMinutes}m`;
  }

  if (totalHours !== 0 && totalMinutes === 0) {
    return `${totalHours}h`;
  }

  return `${totalMinutes}m`;
}
