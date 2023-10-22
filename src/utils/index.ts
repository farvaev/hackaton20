export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function formatDate(date: Date) {
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}T${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}Z`;
}
