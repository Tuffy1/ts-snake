import Snake from "./snake";
import Food from "./food";
import CONFIG from "./game.config";
import {
  getIntersectionBetweenRectAndRect,
  getIntersectionBetweenRectAndSegment,
  isSamePoint,
  isCoincide
} from "./utils/math";

export default class Game {
  /**Properties */
  private _snake: Snake;
  private _food: Food;
  private _isGameOver: boolean;
  /**Constructor */
  constructor() {
    this.init();
  }
  /**Private Methods */
  private init() {
    this._snake = new Snake();
    this._food = new Food();
    this._isGameOver = false;
  }
  private snakeMove() {
    this._snake.moveStep();
  }
  private isSnakeTouchFood(): boolean {
    const snakeHead = this._snake.bodyParts[0];
    const snakeRect = {
      x: snakeHead.X,
      y: snakeHead.Y,
      width: CONFIG.LATTICE_SIZE,
      height: CONFIG.LATTICE_SIZE
    };
    const food = this._food.position;
    const foodRect = {
      x: food.X,
      y: food.Y,
      width: CONFIG.LATTICE_SIZE,
      height: CONFIG.LATTICE_SIZE
    };
    const intersections = getIntersectionBetweenRectAndRect(
      snakeRect,
      foodRect
    );
    return !!(intersections && intersections.length);
  }
  private isSnakeTouchSelf(): boolean {
    const snakeHead = this._snake.bodyParts[0];
    const snakeRect = {
      x: snakeHead.X,
      y: snakeHead.Y,
      width: CONFIG.LATTICE_SIZE,
      height: CONFIG.LATTICE_SIZE
    };
    const snakeCrown = this._snake.snakeCrown;
    for (let i = 2; i < this._snake.bodyParts.length; i += 1) {
      const part = this._snake.bodyParts[i];
      const partRect = {
        x: part.X,
        y: part.Y,
        width: CONFIG.LATTICE_SIZE,
        height: CONFIG.LATTICE_SIZE
      };
      const isTouch = isCoincide(
        partRect,
        snakeCrown.point1,
        snakeCrown.point2
      );
      if (isTouch) {
        return true;
      }
    }
    return false;
  }
  private clearCanvas() {
    document.getElementById("snake").innerHTML = "";
    document.getElementById("food").innerHTML = "";
  }
  /**Public Methods */
  public keepMove() {
    this.snakeMove();
    if (this.isSnakeTouchSelf()) {
      this._isGameOver = true;
    }
    if (this.isSnakeTouchFood()) {
      // 蛇吃到了食物
      this._snake.growUp();
      this._food.redrawFood();
    }
    if (!this._isGameOver) {
      setTimeout(this.keepMove.bind(this), 50);
    } else {
      document.getElementById("game").style.display = "block";
    }
    // requestAnimationFrame(this.keepMove.bind(this));
  }
  public restart() {
    this.clearCanvas();
    this.init();
  }
}
