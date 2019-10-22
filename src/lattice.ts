import CONFIG from "./game.config";
export default class Lattice {
  /**Properties */
  private _x: number; // 格子左上角点的x与y
  private _y: number;
  /**Constructor */
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  /**Private Methods */
  /**Public Methods */
  set X(x: number) {
    this._x = x;
  }
  set Y(y: number) {
    this._y = y;
  }
  get X() {
    return this._x;
  }
  get Y() {
    return this._y;
  }
  get pointOn() {
    this._y -= CONFIG.LATTICE_SIZE;
    return this;
  }
  get pointDown() {
    this._y += CONFIG.LATTICE_SIZE;
    return this;
  }
  get pointRight() {
    this._x += CONFIG.LATTICE_SIZE;
    return this;
  }
  get pointLeft() {
    this._x -= CONFIG.LATTICE_SIZE;
    return this;
  }
  public drawLattice(name: string, latticeSize: number, color: string) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", this._x + "");
    rect.setAttribute("y", this._y + "");
    rect.setAttribute("width", latticeSize + "");
    rect.setAttribute("height", latticeSize + "");
    rect.setAttribute("fill", color);
    rect.setAttribute("name", name);
    if (name === "food") {
      document.getElementById("food").appendChild(rect);
    } else {
      document.getElementById("snake").appendChild(rect);
    }
  }
}
