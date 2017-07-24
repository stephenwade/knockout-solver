class Gui {
  constructor(numSpaces) {

    paper.setup('knockout-canvas');
    this.numSpaces = numSpaces;
    this.marbleRadius = 20;
    this.textSize = 20;
    let bigRadius = (paper.view.size.height / 2) - this.marbleRadius;
    let numberRadius = (paper.view.size.height / 2) - (this.marbleRadius * 2) - (this.textSize);
    let smallRadius = (paper.view.size.height / 2) - (this.marbleRadius * 4) - 20;
    let center = paper.view.center;
    let shiftedCenter = paper.view.center;
    shiftedCenter.y += (this.textSize / 2.2);

    let outerPoints = [];
    let numberPoints = [];
    let innerPoints = [];

    this.populatePoints(center, this.numSpaces, bigRadius, outerPoints);
    this.populatePoints(shiftedCenter, this.numSpaces, numberRadius, numberPoints);
    this.populatePoints(center, this.numSpaces, smallRadius, innerPoints);

    this.outerCircles = [];
    this.numbers = [];
    this.innerCircles = [];

    this.populateCircles(this.marbleRadius, outerPoints, this.outerCircles);
    this.populateNumbers(this.textSize, numberPoints, this.numbers);
    this.populateCircles(this.marbleRadius, innerPoints, this.innerCircles);

    paper.view.update();

    window.addEventListener('knockout-gamestate', event => {
      this.updateBoard(event.detail.board);
    });

    paper.view.draw();
  }

  updateBoard(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].state == 'empty') {
        this.outerCircles[i].fillColor = null;
        this.innerCircles[i].fillColor = null;
      } else if (board[i].state == 'one') {
        this.outerCircles[i].fillColor = board[i].player.color;
        this.innerCircles[i].fillColor = null;
      } else if (board[i].state == 'two') {
        this.outerCircles[i].fillColor = board[i].player.color;
        this.innerCircles[i].fillColor = board[i].player.color;
      }
    }

    paper.view.update();
  }

  populatePoints(center, numPoints, radius, arr) {
    for (let i = 0; i < numPoints; i++) {
      let thisAngle = (i / numPoints) * 360 - 90 + (.5/numPoints*360);
      arr.push(center.add(new paper.Point({
        length: radius,
        angle: thisAngle
      })));
    }
  }

  populateCircles(radius, pointArr, arr) {
    for (let item of pointArr) {
      let circ = new paper.Path.Circle(item, radius);
      circ.fillColor = null;
      circ.strokeColor = 'black';
      circ.strokeWidth = 3;
      arr.push(circ);
    }
  }

  populateNumbers(size, pointArr, arr) {
    for (let i = 0; i < pointArr.length; i++) {
      let text = new paper.PointText(pointArr[i]);
      text.content = (i + 1).toString();
      text.fillColor = 'black';
      text.justification = 'center';
      text.fontSize = size;
      arr.push(text);
    }
  }
}