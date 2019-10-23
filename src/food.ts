import Lattice from "./lattice";
import CONFIG from "./game.config";
import { getRandom } from "./utils/math";

export default class Food {
  /**Properties */
  private _position: Lattice = new Lattice(0, 0);
  /**Private Methods */
  constructor() {
    this._position.X = getRandom(100, 300);
    this._position.Y = getRandom(10, 200);
    this.drawFood(this._position);
  }
  /**Public Methods */
  get position(): Lattice {
    return this._position;
  }
  drawFood(p: Lattice) {
    p.drawLattice("food", CONFIG.LATTICE_SIZE, CONFIG.FOOD_COLOR);
  }
  public redrawFood() {
    this._position.X = getRandom(100, 300);
    this._position.Y = getRandom(10, 200);
    const foodEle = document.getElementsByName("food")[0];
    foodEle.setAttribute("x", this._position.X + "");
    foodEle.setAttribute("y", this._position.Y + "");
  }
}
