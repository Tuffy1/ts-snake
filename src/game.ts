import Snake from "./snake";
import Food from "./food";

export default class Game {
  /**Properties */
  private _snake: Snake;
  private _food: Food;
  /**Constructor */
  constructor() {
    this._snake = new Snake();
    this._food = new Food();
  }
  /**Private Methods */
  private snakeMove() {
    this._snake.moveStep();
  }
  /**Public Methods */
  public keepMove() {
    this.snakeMove();
    requestAnimationFrame(this.keepMove.bind(this));
  }
}
