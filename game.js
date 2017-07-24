const uuid4 = function() {
  // https://gist.github.com/kaizhu256/4482069
  //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  var uuid = "",
    ii;
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += "-";
        uuid += ((Math.random() * 16) | 0).toString(16);
        break;
      case 12:
        uuid += "-";
        uuid += "4";
        break;
      case 16:
        uuid += "-";
        uuid += ((Math.random() * 4) | 8).toString(16);
        break;
      default:
        uuid += ((Math.random() * 16) | 0).toString(16);
    }
  }
  return uuid;
};

const rollDie = function(value) {
  return Math.floor(Math.random() * value) + 1;
};

class BoardSpace {
  constructor() {
    this.state = "empty"; // possible states: empty, one, both
    this.player = undefined;
  }

  canMove(player) {
    if (this.state === "empty") return true;
    if (this.state === "one" && this.player === player) return true;
    return false;
  }

  move(player) {
    if (this.state === "empty") {
      this.state = "one";
      this.player = player;
      return true;
    } else if (this.state === "one" && this.player === player) {
      this.state = "both";
      return true;
    }

    if (this.canMove(player)) throw new Error("move and canMove disagree");

    return false;
  }
}

class Player {
  constructor(name, color) {
    this.id = uuid4();
    this.name = name;
    this.color = color;
  }
}

class Game {
  constructor(numSpaces) {
    const board = [];
    for (let i = 0; i < numSpaces; i++) board.push(new BoardSpace());
    this.board = board;
    this.players = [];
    this.currentPlayer = undefined;
    this.gameState = "starting"; // possible states: starting, playing, end
    this.lastDiceTotal = undefined;
  }

  addPlayer(name, color) {
    if (this.gameState != "starting") return false;

    const player = new Player(name, color);
    this.players.push(player);
    this._broadcastState();
    return player.id;
  }

  removePlayer(id) {
    if (this.gameState != "starting") return false;

    for (let i = 0; i < this.players.length; i++) {
      if (id === this.players[i].id) {
        this.players.splice(i, 1); // remove this.players[i]
      }
    }
    this._broadcastState();
    return true;
  }

  startGame() {
    if (this.players.length < 2) return false;

    this.gameState = "playing";
    this._nextTurn();
  }

  takeTurn(id, moves) {
    if (this._getPlayerById(id) !== currentPlayer) return false;

    if (new Set(moves).size != moves.length) return false;

    if (moves.any(move => move >= this.board.length)) return false;

    if (moves.reduce((sum, move) => sum + move, 0) != this.lastDiceTotal)
      return false;

    if (moves.all(move => this.board[move].canMove(this.currentPlayer))) {
      moves.forEach(move => this.board[move].move(this.currentPlayer));
      this._nextTurn();
      return true;
    }
    return false;
  }

  _broadcastState() {
    const state = {
      board: this.board.map(item => Object.assign({}, item)),
      players: this.players.map(player => Object.assign({}, player)),
      currentPlayer: this.currentPlayer ? this.currentPlayer.id : undefined,
      gameState: this.gameState
    };

    window.dispatch(
      new CustomEvent("knockout-gamestate", {
        detail: state
      })
    );
  }

  _getPlayerById(id) {
    return this.players.find(player => player.id == id);
  }

  _nextTurn() {
    if (this.gameState != "playing") return false;

    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[
      (currentPlayerIndex + 1) % this.players.length
    ];

    const dice = [];
    let diceTotal = 0;
    for (let i = 0; i < 3; i++) {
      let roll = rollDie(6);
      dice.push(roll);
      diceTotal += roll;
    }
    this.lastDiceTotal = diceTotal;

    const turn = {
      player: this.currentPlayer.id,
      dice: dice,
      diceTotal: diceTotal
    };

    window.dispatch(
      new CustomEvent("knockout-nextturn", {
        detail: turn
      })
    );

    this._broadcastState();
    return true;
  }
}
