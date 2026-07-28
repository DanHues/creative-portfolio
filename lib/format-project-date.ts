export function formatProjectDate(date: string | undefined, year: string) {
  if (!date) return year;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
