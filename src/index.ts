import "./style.css";
import Game from "./game";
import { setAttr } from "./utils/common";
import CONFIG from "./game.config";

window.onload = () => {
  // 实例化游戏对象
  let game = new Game();
  game.keepMove();
  // 初始化游戏区域
  const wallSVG = document.getElementById("wall");
  const winWidth = CONFIG.SPACE_WIDTH + "";
  const winHeight = CONFIG.SPACE_HEIGHT + "";
  setAttr(wallSVG.getElementsByClassName("top")[0], { x2: winWidth });
  setAttr(wallSVG.getElementsByClassName("left")[0], { y2: winHeight });
  setAttr(wallSVG.getElementsByClassName("bottom")[0], {
    x2: winWidth,
    y1: winHeight,
    y2: winHeight
  });
  setAttr(wallSVG.getElementsByClassName("right")[0], {
    x1: winWidth,
    x2: winWidth,
    y1: winHeight
  });
  // “重新开始”游戏按钮事件
  document.getElementsByTagName("button")[0].addEventListener("click", () => {
    document.getElementById("game").style.display = "none";
    game.restart();
    game.keepMove();
  });
};
