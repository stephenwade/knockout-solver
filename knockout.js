class BoardSpace {
  constructor() {
    this.state = 'empty'; // possible states: empty, one, both
    this.player = undefined;
  }
}

class Board {
  constructor(numSpaces) {
    this.spaces = Array(numSpaces).fill(BoardSpace());
  }
}