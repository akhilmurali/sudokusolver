var str = "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";
var arr = str.split('');
console.log(arr);
var sudokuGrid = [[]];
for (var i=0; i<9; i++){
	for(var j = 0; j<9; j++){
		if(arr[i] == '-'){
			sudokuGrid[i][j] = 0;
		}else{
			sudokuGrid[i][j] = parseInt(arr[i]);
		}
	}
}

console.log(sudokuGrid);