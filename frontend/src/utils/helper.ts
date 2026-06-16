export const camelToNormal = (str: string) =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "short", // "Jun"
  day: "numeric", 
  year: "numeric", // "2026"
});
