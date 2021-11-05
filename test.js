// Utility Functions - Random Num in Range
var randomNum = function(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var splitNum = function(x, number){
    var numArray = [];
    var tempNum = number
    for (var i = 0; i < x; i++){
        
        if (i == x-1){ //push differnce for last array
            numArray.push(tempNum);
        }else{
            n = randomNum(0,tempNum);
            tempNum -= n;
            numArray.push(n);
        }
        
    
    }
    return(numArray)
  }

console.log(splitNum(1,50));