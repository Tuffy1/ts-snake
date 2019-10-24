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
function getRandom(min: number, max: number): number {
  const c = max - min + 1;
  return Math.floor(Math.random() * c + min);
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
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);
  if (p3.x >= minX && p3.x <= maxX && p3.y >= minY && p3.y <= maxY) {
    return true;
  }
  return false;
}
/**
 * 通过Rect格式的矩形得到四个点连成的四条线段端点数组
 * @param rect
 */
function getRectData(rect: Rect) {
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
  return pointArr;
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
  const pointArr = getRectData(rect);
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
/**
 * 得到两个矩形的交点
 * @param rect1 第一个矩形数据
 * @param rect2 第二个矩形数据
 */
function getIntersectionBetweenRectAndRect(
  rect1: Rect,
  rect2: Rect
): P[] | null {
  const pointArr = getRectData(rect1);
  let intersectionArr: P[] = [];
  for (let i = 0; i < pointArr.length; i += 1) {
    const p = pointArr[i];
    const intersections = getIntersectionBetweenRectAndSegment(
      rect2,
      p.rectP1,
      p.rectP2
    );
    if (intersections && intersections.length) {
      intersectionArr = intersectionArr.concat(intersections);
    }
  }
  if (intersectionArr.length > 0) {
    return intersectionArr;
  } else {
    return null;
  }
}
function isPointOnRectEdge(rect: Rect, p: P): boolean {
  const rectEdgeArr = getRectData(rect);
  for (let i = 0; i < rectEdgeArr.length; i += 1) {
    const edge = rectEdgeArr[i];
    const lineParam = getLineByPoints(edge.rectP1, edge.rectP2);
    if (lineParam.A * p.x + lineParam.B * p.y + lineParam.C === 0) {
      if (isPointOnSegment(edge.rectP1, edge.rectP2, p)) {
        return true;
      }
    }
  }
  return false;
}
function isSamePoint(p1: P, p2: P): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}
/**
 * 矩形是否存在边与线段重合
 * @param rect 矩形
 * @param p1 线段第一个端点
 * @param p2 线段第二个端点
 */
function isCoincide(rect: Rect, p1: P, p2: P): boolean {
  const rectParam = getRectData(rect);
  for (let i = 0; i < rectParam.length; i += 1) {
    const edge = rectParam[i];
    const line1: LineParam = getLineByPoints(edge.rectP1, edge.rectP2);
    const line2: LineParam = getLineByPoints(p1, p2);
    // (A2 B1 - A1 B2) === 0 如果等于0, 就是两条直线平行
    // A * x + B * y + C === 0 意味着点在直线上，两个条件结合即两直线重合
    if (
      line2.A * line1.B - line1.A * line2.B === 0 &&
      line1.A * p2.x + line1.B * p2.y + line1.C === 0
    ) {
      if (
        isPointOnSegment(edge.rectP1, edge.rectP2, p1) ||
        isPointOnSegment(edge.rectP1, edge.rectP2, p2) ||
        isPointOnSegment(p1, p2, edge.rectP1) ||
        isPointOnSegment(p1, p2, edge.rectP2)
      ) {
        // 某个线段端点在另一个线段上，意味着两线段有重合部分
        return true;
      }
    }
  }
  return false;
}

/**
 * 线段是否与另一线段存在重合
 * @param p1 线段1第一个端点
 * @param p2 线段1第二个端点
 * @param p2 线段2第一个端点
 * @param p3 线段2第二个端点
 */
function isSegmentCoincide(p1: P, p2: P, p3: P, p4: P): boolean {
  const line1: LineParam = getLineByPoints(p1, p2);
  const line2: LineParam = getLineByPoints(p3, p4);
  // (A2 B1 - A1 B2) === 0 如果等于0, 就是两条直线平行
  // A * x + B * y + C === 0 意味着点在直线上，两个条件结合即两直线重合
  if (
    line2.A * line1.B - line1.A * line2.B === 0 &&
    line1.A * p3.x + line1.B * p3.y + line1.C === 0
  ) {
    if (
      isPointOnSegment(p1, p2, p3) ||
      isPointOnSegment(p1, p2, p4) ||
      isPointOnSegment(p3, p4, p1) ||
      isPointOnSegment(p3, p4, p2)
    ) {
      // 某个线段端点在另一个线段上，意味着两线段有重合部分
      return true;
    }
  }
  return false;
}

export {
  getRandom,
  getIntersectionBetweenRectAndSegment,
  getIntersectionBetweenRectAndRect,
  isCoincide,
  isSegmentCoincide
};
