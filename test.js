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

//console.log(splitNum(1,50));

var normalize = function(x,num){
    var numArray = [];
    var numArray2 = [];
    var sum = 0;
    var rem = 0; // Remainder

    // Generate Random Int Array
    for (var i = 0; i < x; i++){
        n = randomNum(1,num);
        numArray.push(n);
        sum += n;
    } 
    // Normalize to have all numbers in array add to num
    for (var i = 0; i < x; i++){
        var count = numArray[i]*num + rem;
        numArray2.push(Math.floor(count / sum));
        rem = count % sum;
    }
    return numArray2;
}

normalize(3,20);
normalize(3,10);
normalize(2,10);

