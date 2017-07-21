class BoardSpace {
  constructor() {
    this.state = 'empty'; // possible states: empty, one, both
    this.player = undefined;
  }

  move(player) {
    if (this.state == 'empty') {
      this.state = 'one';
      this.player = player;
      return true;
    }
    else if (this.state == 'one' && this.player == player) {
      this.state = 'two';
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
    this.spaces = Array(numSpaces).fill(BoardSpace());
  }

  move(player, spaceIndex) {
    return this.spaces[spaceIndex].move(player);
  }

  getState(spaceIndex) {
    return this.spaces[spaceIndex].getState();
  }
}

class Player {
  constructor() {
    // lol we literally don't need a constructor
  }
}