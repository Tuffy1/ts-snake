export function getRandom(min: number, max: number): number {
  return parseInt(Math.random() * (max - min + 1) + max + "", 10);
}
interface P {
  x: number;
  y: number;
}
interface LineParam {
  A: number;
  B: number;
  C: number;
}
interface Rect {
  x: number;
  y: number;
  width: number;
  height: nbumber;
}
function getLineOnPoints(p1: P, p2: P): LineParam {
  const A = p2.y - p1.y;
  const B = p1.x - p2.x;
  const C = (p2.x - p1.x) * p1.y - (p2.y - p1.y) * p1.x;
  return {
    A,
    B,
    C
  };
}
/**
 * 此函数用于判断：已知两点确定的直线line，和这两点确定的线段segment，另有一点已知是在直线line上了，判断是否在线段segment上
 */
function isPointOnSegment(p1: P, p2: P, p3: P): boolean {
  if ((p3.x > p1.x && p3.x < p2.x) || (p3.x < p1.x && p3.x > p2.x)) {
    return true;
  }
  return false;
}
function getIntersectionBetweenLines(p1: P, p2: P, p3: P, p4: P): P | null {
  const line1: LineParam = getLineOnPoints(p1, p2);
  const line2: LineParam = getLineOnPoints(p3, p4);
  // x = (B2 C1 - B1 C2) / (A2 B1 - A1 B2);
  // y = (A1 C2 - A2 C1) / (A2 B1 - A1 B2);
  // (A2 B1 - A1 B2) != 0 如果等于0, 就是两条直线平行
  if (line2.A * line1.B - line1.A * line2.B === 0) {
    return null;
  }
  const x =
    (line2.B * line1.C - line1.B * line2.C) /
    (line2.A * line1.B - line1.A * line2.B);
  const y =
    (line1.A * line2.C - line2.A * line1.C) /
    (line2.A * line1.B - line1.A * line2.B);
  return { x, y };
}
function getIntersectionBetweenSegments(p1: P, p2: P, p3: P, p4: P): P | null {
  const p = getIntersectionBetweenLines(p1, p2, p3, p4);
  if (p === null) {
    return null;
  }
  if (isPointOnSegment(p1, p2, p) && isPointOnSegment(p3, p4, p)) {
    return p;
  } else {
    return null;
  }
}
function getIntersectionBetweenRectAndSegment(rect: Rect, p1: P, p2: P) {}
