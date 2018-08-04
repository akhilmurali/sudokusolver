/*
*SUDOKU SOLVER: 
*/

let readline = require('linebyline');
let rl = readline('./sudoku_puzzles.txt');
let grid = [];

rl.on('line', (line, lineCount, byteCount) => {
    let arr = line.split('');
    printUnsolvedGrid(arr);
    grid = convertStringToArray(arr);
    solver(grid);
});



function solver(sudokuGrid) {
    var positionArray = [];
    var possibleValues = [];
    var storedPossibilities = false;
    while (sudokuGrid.toString().indexOf('0') != -1) {
        var progressing = false;
        //Straight forward looping filling singular possibilities:
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (sudokuGrid[i][j] == 0) {
                    var xArr = getRowValues(i, sudokuGrid);
                    var yArr = getColumnValues(j, sudokuGrid);
                    var boxArr = getBoxValues(i, j, sudokuGrid);
                    var missingElementsArrray = returnMissingElements(mergeArray(xArr, yArr, boxArr));
                    if (missingElementsArrray.length == 1) {
                        sudokuGrid[i][j] = missingElementsArrray[0];
                        progressing = true;
                    }
                }
            }
        }
        //store the possibilities for each unfilled block:
        //This is triggered only when no element can be filled:
        if (!progressing && !storedPossibilities) {
            storedPossibilities = true;
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (sudokuGrid[i][j] == 0) {
                        var xArr = getRowValues(i, sudokuGrid);
                        var yArr = getColumnValues(j, sudokuGrid);
                        var boxArr = getBoxValues(i, j, sudokuGrid);
                        if (validateArray(xArr) && validateArray(yArr) && validateArray(boxArr)) {
                            var missingElementsArrray = returnMissingElements(mergeArray(xArr, yArr, boxArr));
                            if (positionArray.indexOf([i, j]) == -1) {
                                possibleValues.push(missingElementsArrray);
                                positionArray.push([i, j]);
                            }
                        }
                    }
                }
            }
        }

        if (!progressing && storedPossibilities) {

        }

    }
    printResult(sudokuGrid);
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

function validateArray(array) {
    var flag = true;
    for (i = 0; i < array.length; i++) {
        var j = array[i];
        for (k = (i + 1); k < array.length; k++) {
            if (j === array[k]) {
                flag = false;
            }
        }
    }
    return flag;
}

function returnMissingElements(arr) {
    var baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.forEach(function (element) {
        if (baseArray.indexOf(element) != -1) {
            baseArray.splice(baseArray.indexOf(element), 1);
        }
    });
    return baseArray;
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

function pushBoxValuestoArray(iStart, iEnd, jStart, jEnd) {
    var boxArr = [];
    for (i = iStart; i < iEnd; i++) {
        for (j = jStart; j < jEnd; j++) {
            if (grid[i][j] != 0) {
                boxArr.push(grid[i][j]);
            }
        }
    }
    return boxArr;
}



function getBoxValues(posx, posy, grid) {
    //Box 1:
    if (posx < 3 && posy < 3) {
        return pushBoxValuestoArray(0, 3, 0, 3);
    }

    //Box 2:
    if (posx < 3 && posy > 2 && posy < 6) {
        return pushBoxValuestoArray(0, 3, 3, 6);
    }

    //Box 3:
    if (posx < 3 && posy > 5 && posy < 9) {
        return pushBoxValuestoArray(0, 3, 6, 9);
    }

    //Box 4:
    if (posx > 2 && posx < 6 && posy < 3) {
        return pushBoxValuestoArray(3, 6, 0, 3);
    }

    //Box 5:
    if (posx > 2 && posx < 6 && posy > 2 && posy < 6) {
        return pushBoxValuestoArray(3, 6, 3, 6);
    }

    //Box 6:
    if (posx > 2 && posx < 6 && posy > 5 && posy < 9) {
        return pushBoxValuestoArray(3, 6, 6, 9);
    }

    //Box 7:
    if (posx > 5 && posx < 9 && posy < 3) {
        return pushBoxValuestoArray(6, 9, 0, 3);
    }

    //Box 8:
    if (posx > 5 && posx < 9 && posy > 2 && posy < 6) {
        return pushBoxValuestoArray(6, 9, 3, 6);
    }

    //Box 9:
    if (posx > 5 && posx < 9 && posy > 5 && posy < 9) {
        return pushBoxValuestoArray(6, 9, 6, 9);
    }

    return [];

}

//Function to convert the string format into a 2D array:
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

//Function to print the unsolved grid into the console:
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

//Print the result into the console:
function printResult(grid) {
    console.log("Sudoku Solution:");
    console.log("\n");
    var result = "";
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            result += grid[i][j] + "\t";
        }
        result += "\n";
    }
    console.log(result);
}

