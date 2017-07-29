class Gui {
  constructor(numSpaces) {
    paper.setup('knockout-canvas');

    let smallestDimension = 0;
    if (paper.view.size.height < paper.view.size.width)
      smallestDimension = paper.view.size.height;
    else
      smallestDimension = paper.view.size.width;

    this.numSpaces = numSpaces;
    this.marbleRadius = 20;
    this.textSize = 20;
    this.bigRadius = (smallestDimension / 2) - this.marbleRadius;
    this.numberRadius = (smallestDimension / 2) - (this.marbleRadius * 2) - (this.textSize);
    this.smallRadius = (smallestDimension / 2) - (this.marbleRadius * 4) - 20;
    this.center = paper.view.center;
    this.shiftedCenter = paper.view.center;
    this.shiftedCenter.y += (this.textSize / 2.5);
    this.shiftedCenter.x -= (this.textSize / 15);

    let outerPoints = [];
    let numberPoints = [];
    let innerPoints = [];

    this.populatePoints(this.center, this.numSpaces, this.bigRadius, outerPoints);
    this.populatePoints(this.shiftedCenter, this.numSpaces, this.numberRadius, numberPoints);
    this.populatePoints(this.center, this.numSpaces, this.smallRadius, innerPoints);

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

    paper.view.onResize = () => {
      let smallestDimension = 0;
      if (paper.view.size.height < paper.view.size.width)
        smallestDimension = paper.view.size.height;
      else
        smallestDimension = paper.view.size.width;

      this.bigRadius = (smallestDimension / 2) - this.marbleRadius;
      this.numberRadius = (smallestDimension / 2) - (this.marbleRadius * 2) - (this.textSize);
      this.smallRadius = (smallestDimension / 2) - (this.marbleRadius * 4) - 20;
      this.center = paper.view.center;
      this.shiftedCenter = paper.view.center;
      this.shiftedCenter.y += (this.textSize / 2.5);
      this.shiftedCenter.x -= (this.textSize / 15);

      let outerPoints = [];
      let numberPoints = [];
      let innerPoints = [];

      this.populatePoints(this.center, this.numSpaces, this.bigRadius, outerPoints);
      this.populatePoints(this.shiftedCenter, this.numSpaces, this.numberRadius, numberPoints);
      this.populatePoints(this.center, this.numSpaces, this.smallRadius, innerPoints);

      for (let item of this.outerCircles) {
        item.remove();
      }

      for (let item of this.numbers) {
        item.remove();
      }

      for (let item of this.innerCircles) {
        item.remove();
      }

      this.outerCircles = [];
      this.numbers = [];
      this.innerCircles = [];

      this.populateCircles(this.marbleRadius, outerPoints, this.outerCircles);
      this.populateNumbers(this.textSize, numberPoints, this.numbers);
      this.populateCircles(this.marbleRadius, innerPoints, this.innerCircles);
    }
  }

  updateBoard(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].state == 'empty') {
        this.outerCircles[i].fillColor = null;
        this.innerCircles[i].fillColor = null;
      } else if (board[i].state == 'one') {
        this.outerCircles[i].fillColor = board[i].player.color;
        this.innerCircles[i].fillColor = null;
      } else if (board[i].state == 'both') {
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
