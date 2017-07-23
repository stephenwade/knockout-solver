let numSpaces = 18;
let marbleRadius = 20;
let textSize = 20;
let bigRadius = (view.size.height / 2) - marbleRadius;
let numberRadius = (view.size.height / 2) - (marbleRadius * 2) - (textSize);
let smallRadius = (view.size.height / 2) - (marbleRadius * 4) - 20;
let center = view.center;
let shiftedCenter = view.center;
shiftedCenter.y += (textSize / 2.2);

let outerPoints = [];
let numberPoints = [];
let innerPoints = [];

populatePoints(center, numSpaces, bigRadius, outerPoints);
populatePoints(shiftedCenter, numSpaces, numberRadius, numberPoints);
populatePoints(center, numSpaces, smallRadius, innerPoints);

console.log(outerPoints.length);

let outerCircles = [];
let numbers = [];
let innerCircles = [];

populateCircles(marbleRadius, outerPoints, outerCircles);
populateNumbers(textSize, numberPoints, numbers);
populateCircles(marbleRadius, innerPoints, innerCircles);

view.update();

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

function updateBoard(board) {
  for (let i = 0; i < board.spaces.length; i++) {
    if (board.spaces[i].state == 'empty') {
      outerCircles[i].fillColor = null;
      innerCircles[i].fillColor = null;
    } else if (board.spaces[i].state == 'one') {
      outerCircles[i].fillColor = board.spaces[i].player.color;
      innerCircles[i].fillColor = null;
    } else if (board.spaces[i].state == 'two') {
      outerCircles[i].fillColor = board.spaces[i].player.color;
      innerCircles[i].fillColor = board.spaces[i].player.color;
    }
  }
}

let boardState = {
  spaces: [
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
  ]
};

updateBoard(boardState);
