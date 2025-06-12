export function formatTo12HourTime(isoString: Date) {
  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${paddedMinutes}${ampm}`;
}
