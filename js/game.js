
let boardContainer = document.getElementById('boardContainer');
     
    // create a 2D array to represent the chess board
      var board = new Array(8);
    //   for (var i = 0; i < 8; i++) {
    //     board[i] = new Array(8);
    //   }

    //Rows
    for (let i = 1; i < 9; i++) {
        
        board[i] = new Array(8);

        //creates 8 rows in the board
        let boardRows = document.createElement('div');
        boardRows.classList.add('boardRow');
       
        //coloumns
        for(var j = 1; j < 9 ; j++) {

            //crates  small white & black boxes in the rows
            let smallBoxes = document.createElement('div');
            smallBoxes.classList.add('boxes');

            //assigning the values for rows and coloumns for making board clickable and getting coordinates
            smallBoxes.dataset.row = i;
            smallBoxes.dataset.col = j;

            //Logic for colouring the smallBoxes
            if ( ( i + j ) % 2 == 0){
                smallBoxes.style.background = 'transparent';
                // smallBoxes.style.background = 'white';
            }
            else {
                smallBoxes.style.background = 'transparent';
                 // smallBoxes.style.background = 'black';
            }
            boardRows.appendChild(smallBoxes);
          
            //indexing the value for changing colour or placing image
            board[i][j] = smallBoxes;
            
        }
        boardContainer.appendChild(boardRows); 

    }


    //logic for clicking and selecting the box
    var squares = document.querySelectorAll(".boxes");
    squares.forEach(function(square) {
      square.addEventListener("click", function() {
        var xAxis = this.dataset.row;
        var yAxis = this.dataset.col;

        //flipping x and y points just to log
        var pointX = yAxis;
        var pointY = xAxis
        console.log("x: "+pointX+" y: "+pointY);

      //converting pointX to letter(alphabet)
        const switchedX = convertToLetter(pointX); 
        // console.log(switchedX);

        //switched current position
        var currentPosition = switchedX + "," + pointY;
        console.log("current position: ",currentPosition);
        //switched treasure position
        var treasurePosition = convertToLetter(xAxisTreasurePoint) + "," + yAxisTreasurePoint;
        console.log("Treasure position: ",treasurePosition);

          //Hint Logic xAxis
        var hintx = 0;
        if (pointX > xAxisTreasurePoint ) {
            hintx = pointX - xAxisTreasurePoint; 
        }
        else {
            hintx = xAxisTreasurePoint - pointX;
        }
        // document.getElementById("hintx").innerHTML = hintx;
         //Hint Logic yAxis
         var hinty = 0;
        if (pointY > yAxisTreasurePoint ) {
            hinty = pointY - yAxisTreasurePoint; 
        }
        else {
            hinty = yAxisTreasurePoint - pointY;
        }
        // document.getElementById("hinty").innerHTML = hinty;

      // for hint and stepsAway
        var stepsAway = hintx + hinty
        document.getElementById("stepsAway").innerHTML = " {" + currentPosition + "} and " + stepsAway;

        // changin the colour of the coordinate point
        if(pointX == xAxisTreasurePoint && pointY == yAxisTreasurePoint){
            console.log("Yay ! you found the treasure...");
            // changeBoxColor(xAxis, yAxis, "green");
            board[xAxis][yAxis].innerHTML = "<img src='./images/Treasure.png' height='85' width='85'>";
        }
        else { 
          // changeBoxColor(xAxis, yAxis, "white");
          board[xAxis][yAxis].innerHTML = "<img src='./images/Hole_in_Ground.png' height='55' width='75'>";
        }

        //to make hint div visible
        if (pointY && stepsAway !== 0) {
          const myDiv = document.getElementById("hint");
          myDiv.style.display = "block";
        }

        //when treasure is found
        if (stepsAway === 0 ) {
          // display foundTreasure div
          const myDiv = document.getElementById("foundTreasure");
          myDiv.style.display = "block";

          // hide foundTreasure div
          const myDiv2 = document.getElementById("hint");
          myDiv2.style.display = "none";
          
        }

      });

    });

    var convertToLetter = (pointX) => {
      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      return alphabet[pointX - 1];
    }

    // method for changing colour
     function changeBoxColor(x, y, color) {
        board[x][y].style.backgroundColor = color;
      }
    //   changeBoxColor(1, 2, "red");

//  treasure co-ordinates
// Function to generate random number
    var randomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
       return  Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //setting the coordinates for treasure point
        var xAxisTreasurePoint = randomNumber(1, 8);
        var yAxisTreasurePoint = randomNumber(1, 8);
        console.log("xAxisTreasurePoint : ",xAxisTreasurePoint,"yAxisTreasurePoint : ",yAxisTreasurePoint);
    
 
