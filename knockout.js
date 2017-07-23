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

  getState() {
    return this.state;
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
  constructor(id) {
    this.id = id;
  }
}

class Game {
  constructor() {
    this.board = new Board(18);
    this.players = [];
    this.currentPlayer = undefined;
    this.gameState = 'starting'; // possible states: starting, playing, end
  }

  broadcastState(isReadyForNextTurn) {
    var event = new CustomEvent('broadcaststate', {
      'readyForNextTurn': isReadyForNextTurn,
      'nextPlayer': this.currentPlayer ? this.currentPlayer.id : undefined,
      'board': this.board,
      'gameState': this.gameState
    });

    this.dispatchEvent(event);
  }

  addPlayer(player) {
    this.players.push(player);
    this.broadcastState();
  }

  removePlayer(id) {
    for (let i = 0; i < this.players.length; i++) {
      if (id === this.players[i].id) {
        this.players.splice(i, 1) // remove this.players[i]
      }
    }
    this.broadcastState();
  }

  startGame() {
    this.gameState = 'playing';
    this.broadcastState();
  }

  // returns true on success
  nextTurn() {
    // no players in player array
    if (this.players.length == 0) {
      return false;
    }

    // current player isn't defined
    if (this.currentPlayer == undefined) {
      this.currentPlayer = players[0];
      return true;
    }

    var currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    // current player isn't part of the player array
    if (currentPlayerIndex == -1) {
      return false;
    }

    // normal case, move the player along
    this.currentPlayer = this.players[(currentPlayerIndex + 1) % this.players.length];
    return true;
  }
}
