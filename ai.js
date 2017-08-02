class KnockoutAI {
  constructor(id, takeTurnFn) {
    window.addEventListener("knockout-nextturn", e => {
      if (e.detail.player != id) return;

      const turn = this._takeTurn(e.detail);
      window.setTimeout(() => {
        const success = takeTurnFn(id, turn);
        if (!success) {
          takeTurnFn(id, []);
          console.error(
            `${id} tried to make an invalid move, skipping turn
attempted move: [${turn.toString()}]
next turn detail:`,
            e.detail
          );
        }
      }, 500);
    });
  }

  // turn: {
  //   board: Array<{ state: string, player?: string }>,
  //   player: string,
  //   dice: Array<number>,
  //   diceTotal: number
  // }
  _takeTurn(turn) {
    return [];
  }
}
