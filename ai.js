class KnockoutAI {
  constructor(id, takeTurnFn) {
    window.addEventListener("knockout-nextturn", e => {
      if (e.detail.player == id) takeTurnFn(id, this._takeTurn(e.detail));
    });
  }

  _takeTurn(detail) {
    return [];
  }
}
