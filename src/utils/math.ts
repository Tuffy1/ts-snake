export function getRandom(min: number, max: number): number {
  return parseInt(Math.random() * (max - min + 1) + max + "", 10);
}
