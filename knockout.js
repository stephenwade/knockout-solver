window.knockout = {};

knockout.game = new Game(18);
knockout.players = [];
knockout.players.push(knockout.game.addPlayer("Stephen", "blue"));
knockout.players.push(knockout.game.addPlayer("Joshua", "red"));

knockout.game.startGame();
