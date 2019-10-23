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
  height: number;
}
/**
 * 通过两点得到直线一般式的参数 A, B, C
 * @param p1 直线的第一个点
 * @param p2 直线的第二个点
 */
function getLineByPoints(p1: P, p2: P): LineParam {
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
 * @param p1 直线的第一个点
 * @param p2 直线的第二个点
 * @param p3 需要进行判断的点
 */
function isPointOnSegment(p1: P, p2: P, p3: P): boolean {
  if ((p3.x > p1.x && p3.x < p2.x) || (p3.x < p1.x && p3.x > p2.x)) {
    return true;
  }
  return false;
}
/**
 * 得到两直线的交点
 * @param p1 直线1上的第一个点
 * @param p2 直线1上的第二个点
 * @param p3 直线2上的第一个点
 * @param p4 直线2上的第二个点
 */
function getIntersectionBetweenLines(p1: P, p2: P, p3: P, p4: P): P | null {
  const line1: LineParam = getLineByPoints(p1, p2);
  const line2: LineParam = getLineByPoints(p3, p4);
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
/**
 * 得到两线段的交点
 * @param p1 线段1上的第一个端点
 * @param p2 线段1上的第二个端点
 * @param p3 线段2上的第一个端点
 * @param p4 线段2上的第二个端点
 */
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
/**
 * 得到矩形与线段的交点
 * @param rect 矩形
 * @param p1 线段第一个端点
 * @param p2 线段第二个端点
 */
function getIntersectionBetweenRectAndSegment(
  rect: Rect,
  p1: P,
  p2: P
): P[] | null {
  const pointArr = [
    {
      rectP1: { x: rect.x, y: rect.y },
      rectP2: { x: rect.x + rect.width, y: rect.y }
    },
    {
      rectP1: { x: rect.x, y: rect.y },
      rectP2: { x: rect.x, y: rect.y + rect.height }
    },
    {
      rectP1: { x: rect.x, y: rect.y + rect.height },
      rectP2: { x: rect.x + rect.width, y: rect.y + rect.height }
    },
    {
      rectP1: { x: rect.x + rect.width, y: rect.y },
      rectP2: { x: rect.x + rect.width, y: rect.y + rect.height }
    }
  ];
  const intersectionArr: P[] = [];
  for (let i = 0; i < pointArr.length; i += 1) {
    const rectP1: P = pointArr[i].rectP1;
    const rectP2: P = pointArr[i].rectP2;
    const p = getIntersectionBetweenSegments(rectP1, rectP2, p1, p2);
    if (p) {
      intersectionArr.push(p);
    }
  }
  if (intersectionArr.length === 0) {
    return null;
  }
  return intersectionArr;
}
