var str = "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";
var hardestSudoku = "8----------36------7--9-2---5---7-------457-----1---3---1----68--85---1--9----4--"
var mediumSudoku = "---6891--8------2915------84-3----5-2----5----9-24-8-1-847--91-5------6--6-41----"
var arr = str.split('');
printUnsolvedGrid(arr);
var grid = convertStringToArray(arr);
solver(grid);

function solver(sudokuGrid) {
    while (sudokuGrid.toString().indexOf('0') != -1) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                //console.log("Loop fashion: " + sudokuGrid[i][j] + " [" + i + "," + j + "]");
                if (sudokuGrid[i][j] == 0) {
                    //console.log("Logging output for element at: " + i + " " + j);
                    var xArr = getRowValues(i, sudokuGrid);
                    var yArr = getColumnValues(j, sudokuGrid);
                    var boxArr = getBoxValues(i, j, sudokuGrid);
                    sudokuGrid[i][j] = returnMissingElement(mergeArray(xArr, yArr, boxArr));
                }
            }
        }
    }
    printResult(sudokuGrid);
}

function printResult(grid){
    console.log("Sudoku Solution:");
    console.log("\n");
    var result = "";
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            result += grid[i][j] + "\t";
        }
        result += "\n";
    }
    console.log(result);
}


function mergeArray(x, y, box) {
    var mergeResult = (x.concat(y)).concat(box);
    return unique(mergeResult);
}

function unique(array) {
//    console.log("merged Array: " + array);
    for (i = 0; i < array.length; i++) {
        var j = array[i];
        for (k = (i + 1); k < array.length; k++) {
            if (j === array[k]) {
                array.splice(k, 1);
                k = k - 1;
            }
        }
    }
    return array;
}



function returnMissingElement(arr) {
    if(arr.length != 8){
        return 0;
    }
    var baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.forEach(function (element) {
        if (baseArray.indexOf(element) != -1) {
            baseArray.splice(baseArray.indexOf(element), 1);
        }
    });
    if (baseArray.length == 1) {
        return baseArray[0];
    } else {
        return 0;
    }
}

function getRowValues(posx, grid) {
    var hzArray = [];
    for (var i = 0; i < 9; i++) {
        if (grid[posx][i] != 0) {
            hzArray.push(grid[posx][i]);
        }
    }
    return hzArray;
}


function getColumnValues(posy, grid) {
    var vrtArray = [];
    for (var i = 0; i < 9; i++) {
        if (grid[i][posy] != 0) {
            vrtArray.push(grid[i][posy]);
        }
    }
    return vrtArray;
}

function getBoxValues(posx, posy, grid) {
    var boxArr = [];
    //Box 1:
    if (posx < 3 && posy < 3) {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 2:
    if (posx < 3 && posy > 2 && posy < 6) {
        for (i = 0; i < 3; i++) {
            for (j = 3; j < 6; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 3:
    if (posx < 3 && posy > 5 && posy < 9) {
        for (i = 0; i < 3; i++) {
            for (j = 6; j < 9; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 4:
    if (posx > 2 && posx < 6 && posy < 3) {
        for (i = 3; i < 6; i++) {
            for (j = 0; j < 3; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 5:
    if (posx > 2 && posx < 6 && posy > 2 && posy < 6) {
        for (i = 3; i < 6; i++) {
            for (j = 3; j < 6; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 6:
    if (posx > 2 && posx < 6 && posy > 5 && posy < 9) {
        for (i = 3; i < 6; i++) {
            for (j = 6; j < 9; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 7:
    if (posx > 5 && posx < 9 && posy < 3) {
        for (i = 6; i < 9; i++) {
            for (j = 0; j < 3; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 8:
    if (posx > 5 && posx < 9 && posy > 2 && posy < 6) {
        for (i = 6; i < 9; i++) {
            for (j = 3; j < 6; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    //Box 9:
    if (posx > 5 && posx < 9 && posy > 5 && posy < 9) {
        for (i = 6; i < 9; i++) {
            for (j = 6; j < 9; j++) {
                if (grid[i][j] != 0) {
                    boxArr.push(grid[i][j]);
                }
            }
        }
    }

    return boxArr;

}

function printUnsolvedGrid(arr) {
    var unsolvedGrid = "";
    for (var i = 0; i < arr.length; i++) {
        unsolvedGrid += (arr[i] + '\t');
        if ((i + 1) % 9 == 0) {
            unsolvedGrid += "\n";
        }
    }
    console.log("Unsolved sudoku Grid:" + "\n");
    console.log(unsolvedGrid);
}


function convertStringToArray(arr) {
    var grid = [];
    var k = 0;
    for (var i = 0; i < 9; i++) {
        grid[i] = [];
        for (var j = 0; j < 9; j++) {
            if (arr[k] == '-') {
                grid[i][j] = 0;
            } else {
                grid[i][j] = parseInt(arr[k]);
            }
            ++k;
        }
    }
    return grid;
}
