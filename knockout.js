const uuid4 = function () {
  // https://gist.github.com/kaizhu256/4482069
  //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  var uuid = '', ii;
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
    case 8:
    case 20:
      uuid += '-';
      uuid += (Math.random() * 16 | 0).toString(16);
      break;
    case 12:
      uuid += '-';
      uuid += '4';
      break;
    case 16:
      uuid += '-';
      uuid += (Math.random() * 4 | 8).toString(16);
      break;
    default:
      uuid += (Math.random() * 16 | 0).toString(16);
    }
  }
  return uuid;
};

const rollDie = function (value) {
  return Math.floor(Math.random() * value) + 1;
}

class BoardSpace {
  constructor() {
    this.state = 'empty'; // possible states: empty, one, both
    this.player = undefined;
  }

  move(player) {
    if (this.state === 'empty') {
      this.state = 'one';
      this.player = player;
      return true;
    }
    else if (this.state === 'one' && this.player === player) {
      this.state = 'both';
      return true;
    }
    return false;
  }
}

class Board {
  constructor(numSpaces) {
    this.spaces = Array(numSpaces).fill(new BoardSpace());
  }

  move(player, spaceIndex) {
    return this.spaces[spaceIndex].move(player);
  }

  getState(spaceIndex) {
    return this.spaces[spaceIndex].getState();
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
  constructor() {
    this.board = new Board(18);
    this.players = [];
    this.currentPlayer = undefined;
    this.gameState = 'starting'; // possible states: starting, playing, end
  }

  broadcastState() {
    const state = {
      board: board.spaces.map(item => Object.assign({}, item)),
      players: players.map(player => Object.assign({}, player)),
      currentPlayer: typeof currentPlayer == 'undefined' ? undefined : currentPlayer.id,
      gameState: gameState
    };

    window.dispatch(new CustomEvent('knockout-gamestate', {
      detail: state
    }));
  }

  addPlayer(name, color) {
    if (gameState != 'starting')
      return false;

    players.push(new Player(name, color));
    broadcastState();
    return true;
  }

  removePlayer(id) {
    if (gameState != 'starting')
      return false;

    for (let i = 0; i < this.players.length; i++) {
      if (id === this.players[i].id) {
        this.players.splice(i, 1) // remove this.players[i]
      }
    }
    this.broadcastState();
    return true;
  }

  startGame() {
    if (players.length < 2)
      return false;

    this.gameState = 'playing';
    nextTurn();
  }

  nextTurn() {
    if (this.gameState != 'playing')
      return false;

    const currentPlayerIndex = players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentPlayerIndex + 1) % this.players.length];

    const turn = {
      player: currentPlayer.id,
      dice: rollDie(6) + rollDie(6) + rollDie(6)
    };

    window.dispatch(new CustomEvent('knockout-nextturn', {
      detail: turn
    }));

    broadcastState();
    return true;
  }
}
