const canvas = document.getElementById("knockout-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.knockout = {};

knockout.game = new Game(18);
knockout.gui = new Gui(18);
knockout.ais = [];
let takeTurnFn = knockout.game.takeTurn.bind(knockout.game);
knockout.ais.push(
  new StephenAI(knockout.game.addPlayer("Stephen’s AI", "blue"), takeTurnFn)
);
knockout.ais.push(
  new KnockoutAI(knockout.game.addPlayer("Dummy AI", "red"), takeTurnFn)
);

knockout.game.startGame();
