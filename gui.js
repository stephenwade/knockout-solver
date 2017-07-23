class Gui {
  constructor(numSpaces) {
    this.numSpaces = numSpaces;
    this.marbleRadius = 20;
    this.textSize = 20;
    let bigRadius = (view.size.height / 2) - this.marbleRadius;
    let numberRadius = (view.size.height / 2) - (this.marbleRadius * 2) - (this.textSize);
    let smallRadius = (view.size.height / 2) - (this.marbleRadius * 4) - 20;
    let center = view.center;
    let shiftedCenter = view.center;
    shiftedCenter.y += (this.textSize / 2.2);

    let outerPoints = [];
    let numberPoints = [];
    let innerPoints = [];

    populatePoints(center, this.numSpaces, bigRadius, outerPoints);
    populatePoints(shiftedCenter, this.numSpaces, numberRadius, numberPoints);
    populatePoints(center, this.numSpaces, smallRadius, innerPoints);

    this.outerCircles = [];
    this.numbers = [];
    this.innerCircles = [];

    populateCircles(this.marbleRadius, outerPoints, this.outerCircles);
    populateNumbers(this.textSize, numberPoints, this.numbers);
    populateCircles(this.marbleRadius, innerPoints, this.innerCircles);

    view.update();
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

    view.update();
  }
}

function populatePoints(center, numPoints, radius, arr) {
  for (let i = 0; i < numPoints; i++) {
    let thisAngle = (i / numPoints) * 360 - 90 + (.5/numPoints*360);
    arr.push(center + new Point({
      length: radius,
      angle: thisAngle
    }));
  }
}

function populateCircles(radius, pointArr, arr) {
  for (let item of pointArr) {
    let circ = new Path.Circle(item, radius);
    circ.fillColor = null;
    circ.strokeColor = 'black';
    circ.strokeWidth = 3;
    arr.push(circ);
  }
}

function populateNumbers(size, pointArr, arr) {
  for (let i = 0; i < pointArr.length; i++) {
    let text = new PointText(pointArr[i]);
    text.content = (i + 1).toString();
    text.fillColor = 'black';
    text.justification = 'center';
    text.fontSize = size;
    arr.push(text);
  }
}

let boardState = [
  {
    state: 'one',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'one',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'two',
    player: {
      color: '#00ff00'
    }
  },
  {
    state: 'one',
    player: {
      color: '#00ff00'
    }
  },
  {
    state: 'one',
    player: {
      color: '#00ff00'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'one',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'one',
    player: {
      color: '#00ff00'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'one',
    player: {
      color: '#0000ff'
    }
  },
  {
    state: 'emtpy',
    player: {
      color: '#ff0000'
    }
  },
  {
    state: 'one',
    player: {
      color: '#0000ff'
    }
  }
];

let gui = new Gui(18);
gui.updateBoard(boardState);