// INNPUT STRING
var str = "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";

//Converting Input string to Array  
var arr = str.split(''); 

// Converting the 1-D array into 2D - Array 
var grid = [];
while(arr.length) 
	grid.push(arr.splice(0,9));
console.log(grid)

const BLANK = "-";
 
