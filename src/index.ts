import "./style.css";
import Game from "./game";

let game = new Game();

game.keepMove();

document.getElementsByTagName("button")[0].addEventListener("click", () => {
  document.getElementById("game").style.display = "none";
  game.restart();
  game.keepMove();
});
