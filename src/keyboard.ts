enum Direction {
  Up = 38,
  Down = 40,
  Left = 37,
  Right = 39
}
class KeyBoard {
  /**Properties */
  private _keyPress = {};
  /**Constructor */
  constructor() {
    document.addEventListener("keydown", e => {
      this.keyDown(e);
    });
  }
  /**Private Methods */
  private keyDown(e: KeyboardEvent) {
    e.preventDefault();
    this._keyPress = {};
    this._keyPress[Direction[e.keyCode]] = true;
  }
  /**Public Methods */
  set keyPress(direction: string) {
    this._keyPress = {};
    this._keyPress[direction] = true;
  }
  public isPress(direction: string): boolean {
    return !!this._keyPress[direction];
  }
}
const keyboard = new KeyBoard();
export default keyboard;
