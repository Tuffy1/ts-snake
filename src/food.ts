import Lattice from "./lattice";
import CONFIG from "./game.config";
import { getRandom } from "./utils/math";
import { setAttr } from "./utils/common";

export default class Food {
  /**Properties */
  private _position: Lattice = new Lattice(0, 0);
  /**Private Methods */
  constructor() {
    console.log(CONFIG.SPACE_WIDTH);
    this._position.X = getRandom(10, CONFIG.SPACE_WIDTH - 100);
    this._position.Y = getRandom(10, CONFIG.SPACE_HEIGHT - 100);
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
    this._position.X = getRandom(10, CONFIG.SPACE_WIDTH - 100);
    this._position.Y = getRandom(10, CONFIG.SPACE_HEIGHT - 100);
    const foodEle = document.getElementsByName("food")[0];
    setAttr(foodEle, { x: this._position.X + "", y: this._position.Y + "" });
  }
}
