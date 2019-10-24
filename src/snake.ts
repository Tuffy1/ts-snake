import Lattice from "./lattice";
import CONFIG from "./game.config";
import keyboard from "./keyboard";
import { setAttr } from "./utils/common";
enum Direction {
  Up,
  Down,
  Left,
  Right
}
interface PointPair {
  point1: { x: number; y: number };
  point2: { x: number; y: number };
}
export default class Snake {
  /**Properties */
  private _bodyParts: Lattice[] = [];
  private _direction: Direction;
  private _headCrown: PointPair;
  /**Constructor */
  constructor() {
    this._direction = Direction.Right;
    keyboard.keyPress = Direction[3];
    for (let i = 0; i < 4; i += 1) {
      const p = new Lattice(100 - i * CONFIG.LATTICE_SIZE, 100);
      this.drawSnakePart(p, i);
      this._bodyParts.push(p);
    }
  }
  /**Private Methods */
  private headMove() {
    switch (true) {
      case keyboard.isPress("Up"):
        this._bodyParts[0] = this._bodyParts[0].pointOn;
        this._headCrown = {
          point1: { x: this._bodyParts[0].X, y: this._bodyParts[0].Y },
          point2: {
            x: this._bodyParts[0].X + CONFIG.LATTICE_SIZE,
            y: this._bodyParts[0].Y
          }
        };
        this._direction = Direction.Up;
        break;
      case keyboard.isPress("Down"):
        this._bodyParts[0] = this._bodyParts[0].pointDown;
        this._headCrown = {
          point1: {
            x: this._bodyParts[0].X,
            y: this._bodyParts[0].Y + CONFIG.LATTICE_SIZE
          },
          point2: {
            x: this._bodyParts[0].X + CONFIG.LATTICE_SIZE,
            y: this._bodyParts[0].Y + CONFIG.LATTICE_SIZE
          }
        };
        this._direction = Direction.Down;
        break;
      case keyboard.isPress("Left"):
        this._bodyParts[0] = this._bodyParts[0].pointLeft;
        this._headCrown = {
          point1: { x: this._bodyParts[0].X, y: this._bodyParts[0].Y },
          point2: {
            x: this._bodyParts[0].X,
            y: this._bodyParts[0].Y + CONFIG.LATTICE_SIZE
          }
        };
        this._direction = Direction.Left;
        break;
      case keyboard.isPress("Right"):
      default:
        this._bodyParts[0] = this._bodyParts[0].pointRight;
        this._headCrown = {
          point1: {
            x: this._bodyParts[0].X + CONFIG.LATTICE_SIZE,
            y: this._bodyParts[0].Y
          },
          point2: {
            x: this._bodyParts[0].X + CONFIG.LATTICE_SIZE,
            y: this._bodyParts[0].Y + CONFIG.LATTICE_SIZE
          }
        };
        this._direction = Direction.Right;
    }
  }
  private drawSnakePart(p: Lattice, part: number) {
    let color: string = CONFIG.SNAKE_COLOR;
    if (part === 0) {
      color = CONFIG.SNAKE_HEAD_COLOR;
    }
    p.drawLattice(`snake_part_${part}`, CONFIG.LATTICE_SIZE, color);
  }
  /**Public Methods */
  get bodyParts(): Lattice[] {
    return this._bodyParts;
  }
  /**
   * 获取蛇头最顶部的两个点
   */
  get snakeCrown(): PointPair {
    return this._headCrown;
  }
  public moveStep() {
    let partEle: HTMLElement;
    for (let i = this._bodyParts.length - 1; i > 0; i -= 1) {
      this._bodyParts[i].X = this._bodyParts[i - 1].X;
      this._bodyParts[i].Y = this._bodyParts[i - 1].Y;
      partEle = document.getElementsByName(`snake_part_${i}`)[0];
      setAttr(partEle, {
        x: this._bodyParts[i].X + "",
        y: this._bodyParts[i].Y + ""
      });
    }
    this.headMove();
    partEle = document.getElementsByName(`snake_part_0`)[0];
    setAttr(partEle, {
      x: this._bodyParts[0].X + "",
      y: this._bodyParts[0].Y + ""
    });
  }
  /**
   * 蛇吃了食物长大：尾巴变长的方向主要看蛇身体的最后两截方向
   */
  public growUp() {
    const snakeLength = this._bodyParts.length;
    const secondToLast = this._bodyParts[snakeLength - 2];
    const theLast = this._bodyParts[snakeLength - 1];
    let newPartX: number;
    let newPartY: number;
    let dis: number = secondToLast.X - theLast.X;
    if (dis === 0) {
      newPartX = theLast.X;
    } else if (dis > 0) {
      newPartX = theLast.X - CONFIG.LATTICE_SIZE;
    } else {
      newPartX = theLast.X + CONFIG.LATTICE_SIZE;
    }
    dis = secondToLast.Y - theLast.Y;
    if (dis === 0) {
      newPartY = theLast.Y;
    } else if (dis > 0) {
      newPartY = theLast.Y - CONFIG.LATTICE_SIZE;
    } else {
      newPartY = theLast.Y + CONFIG.LATTICE_SIZE;
    }
    const newPart: Lattice = new Lattice(newPartX, newPartY);
    this.drawSnakePart(newPart, snakeLength);
    this._bodyParts.push(newPart);
  }
}
