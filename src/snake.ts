import Lattice from "./lattice";
import CONFIG from "./game.config";
import keyboard from "./keyboard";
enum Direction {
  Up,
  Down,
  Left,
  Right
}
export default class Snake {
  /**Properties */
  private _bodyParts: Lattice[] = [];
  private _direction: Direction;
  /**Constructor */
  constructor() {
    this._direction = Direction.Right;
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
        break;
      case keyboard.isPress("Down"):
        this._bodyParts[0] = this._bodyParts[0].pointDown;
        break;
      case keyboard.isPress("Left"):
        this._bodyParts[0] = this._bodyParts[0].pointLeft;
        break;
      case keyboard.isPress("Right"):
      default:
        this._bodyParts[0] = this._bodyParts[0].pointRight;
    }
  }
  drawSnakePart(p: Lattice, part: number) {
    p.drawLattice(
      `snake_part_${part}`,
      CONFIG.LATTICE_SIZE,
      CONFIG.SNAKE_COLOR
    );
  }
  /**Public Methods */
  public moveStep() {
    let partEle: HTMLElement;
    for (let i = this._bodyParts.length - 1; i > 0; i -= 1) {
      this._bodyParts[i].X = this._bodyParts[i - 1].X;
      this._bodyParts[i].Y = this._bodyParts[i - 1].Y;
      partEle = document.getElementsByName(`snake_part_${i}`)[0];
      partEle.setAttribute("x", this._bodyParts[i].X + "");
      partEle.setAttribute("y", this._bodyParts[i].Y + "");
    }
    this.headMove();
    partEle = document.getElementsByName(`snake_part_0`)[0];
    partEle.setAttribute("x", this._bodyParts[0].X + "");
    partEle.setAttribute("y", this._bodyParts[0].Y + "");
  }
}
