const canvas = document.getElementById("knockout-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.knockout = {};

knockout.game = new Game(18);
knockout.gui = new Gui(18);
knockout.players = [];
knockout.players.push(knockout.game.addPlayer("Stephen", "blue"));
knockout.players.push(knockout.game.addPlayer("Joshua", "red"));

window.addEventListener("knockout-nextturn", e =>
  console.log("next turn", e.detail)
);
knockout.game.startGame();
