const canvas = document.getElementById("knockout-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.knockout = {};

knockout.game = new Game(18);
knockout.gui = new Gui(18);
knockout.ais = [];
let takeTurnFn = knockout.game.takeTurn.bind(knockout.game);
knockout.ais.push(new KnockoutAI(knockout.game.addPlayer("AI 1", "blue"), takeTurnFn));
knockout.ais.push(new KnockoutAI(knockout.game.addPlayer("AI 2", "red"), takeTurnFn));

window.addEventListener("knockout-nextturn", e =>
  console.log("next turn", e.detail)
);

window.addEventListener("knockout-gamestate", e =>
  console.log("game state", e.detail)
);

knockout.game.startGame();
