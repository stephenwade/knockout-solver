class StephenAI extends KnockoutAI {
  // https://oeis.org/A246688
  _partitions(n, i = 1) {
    if (n == 0) return [[]];
    else if (i > n) return [];
    else
      return [
        ...this._partitions(n - i, i + 1).map(x => [i, ...x]),
        ...this._partitions(n, i + 1)
      ];
  }

  _validMoves(board, total) {
    return this._partitions(total).filter(p =>
      p.every(move => board[move - 1].canMove())
    );
  }

  _takeTurn({ board, player, dice, diceTotal }) {
    const validMoves = this._validMoves(board, diceTotal);
    if (validMoves.length)
      return validMoves[0];
    else
      return [];
  }
}
