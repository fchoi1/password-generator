// Assignment code here
// Global Vars
var lowerChar = "abcdefghijklmnopqrstuvwxyz"
var upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var specialChar =" !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\";
var numberChar = '0123456789'
// Store char type in List
var charList = [lowerChar, upperChar, specialChar, numberChar];
var maxPassword = 128;
var minPassword = 8;

//Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var passwordObject = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = passwordObject.value;
}

// Utility Functions - Random Num in Range
var randomNum = function(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Utility Function - Randomly split up x (positive int) items into number 
// NOTE: not totally random, with bias towards the beginning indexes
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
  return numArray;
}

// Utility Function - Better function than splitNum, more randomize
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

// Generate Password Function
var generatePassword = function(){

  //First prompt
  var pwCriteria = prompt("Select Password Criteria: Length, Character, Both, Default");
  pwCriteria = pwCriteria.toLowerCase();
  
  // Create password object, made code scalable to add possible other features such as adding a certain number of chars types
  var passwordInfo = {
    passwordLength: randomNum(minPassword, maxPassword), //Let Default length is random
    useLower: false,
    useUpper: false,
    useSpecial: false,
    useNumber: false,
    value: '',
    charTypeArray: [0,0,0,0], // How many of each character to add 
    numTypes: 0
  };

  // Check valid input
  if (pwCriteria !== 'length' && pwCriteria !== 'character' && pwCriteria !== 'both' && pwCriteria !== 'default'){
    alert("Not a value")
    return passwordInfo;
  }

  // Confirm password length
  if (pwCriteria === 'length' || pwCriteria=== 'both'){
    passwordInfo = confirmPasswordLength(passwordInfo);
  }

  // Confirm Char Type input
  if (pwCriteria === 'character' || pwCriteria === 'both'){
    passwordInfo = confirmCharType(passwordInfo);
  }

  // What if Users selects no char types? Set to default lowerCase then
  if (passwordInfo.numTypes === 0 && pwCriteria === 'character'){
    alert("You did not select a char type, setting to all Lowercase")
 }
 
  // Default setting in nothing is selected
  if (pwCriteria === 'default' || passwordInfo.numTypes === 0){
    //default setting if type not specified
    passwordInfo.useLower = true;
    passwordInfo.charTypeArray[0] = 1;
    passwordInfo.numTypes += 1;
  }
  // Actual function to randomize password
  passwordInfo = randomizePassword(passwordInfo);
  //console.log('the password is ', passwordInfo.value);
  return passwordInfo;
}

var confirmPasswordLength = function(passwordObj){

  // Keep Looping until correct length
  while(true){
    var pwLength = prompt("Enter Desired Password Length (min: " + minPassword +" characters, max: " + maxPassword + " characters)");
    // Check if length of password is accepted
    if (pwLength < minPassword || pwLength > maxPassword){
      alert("Password legnth is out of the range given");
    }else if (isNaN(pwLength)){
      alert("You did not enter a number!");
    }else{
      break; // Until valid number
    }
  }
  passwordObj.passwordLength = pwLength;
  return passwordObj;
}

// Fill in password object details based on char types
var confirmCharType = function(passwordObj){
  if(confirm("Use Lowercase Characters?")){
    passwordObj.useLower = true;
    passwordObj.charTypeArray[0] = 1 ;
    passwordObj.numTypes += 1;
  };

  if(confirm("Use Uppercase Characters?")){
    passwordObj.useUpper = true;
    passwordObj.charTypeArray[1] = 1 ;
    passwordObj.numTypes += 1;
  };

  if(confirm("Use Special Characters?")){
    passwordObj.useSpecial = true;
    passwordObj.charTypeArray[2] = 1 ;
    passwordObj.numTypes += 1;
  };

  if(confirm("Use Number Characters?")){
    passwordObj.useNumber =  true;
    passwordObj.charTypeArray[3] = 1 ;
    passwordObj.numTypes += 1;
  };

  return passwordObj;
}

// Main logic to produce password
var randomizePassword = function(passwordObj){

  // Get Number of each Char Type available to use
  passwordObj = setNumType(passwordObj);

  // Reset password in case first
  passwordObj.value = '';

  // Set an array for charTypeArray
  var numCharType = passwordObj.charTypeArray;

  var randType = 0;
  var tempChar = '';
  var emptyCharList = [];

  for (var i=0; i < passwordObj.passwordLength; i++){

    emptyCharList = checkCharArray(numCharType); // Check which char Types are available to use

    randType = emptyCharList[randomNum(0,emptyCharList.length-1)]; //  Chose only with charTypes remaining
    
    [tempChar, numCharType] = getRandChar(randType, numCharType);
    passwordObj.value += tempChar;
    //console.log("password", passwordObj.value, numCharType, passwordObj.passwordLength);
  }

  return passwordObj;
}

// check which char array is 0 to not use it for password generation
var checkCharArray = function(numCharType){
  var emptyChars = [];
  for (var i=0;i<numCharType.length;i++){
    if (numCharType[i] !== 0){
      emptyChars.push(i);
    }
  }
  return emptyChars;
}

// Get a random char from charList
var getRandChar = function(index, numCharType){
  var randChar = ''; // set empty
  // check if numCharType is empty
  if(numCharType[index] !== 0 ){

    // Get random char from char list 
    // index = 0  --> lowerCase
    // index = 1  --> UpperCase
    // index = 2  --> SpecialCase
    // index = 3  --> numberCase

    randChar = charList[index][randomNum(0,charList[index].length-1)]
    numCharType[index] -= 1; // Decrease char count
  }
  return [randChar, numCharType];
}

// Randomly set how many of each type for the password
var setNumType = function(passwordObj){
  var j = 0; //Array iterator

  // Call to generate random number for each selected char type
  numberOfEachChar = normalize(passwordObj.numTypes, passwordObj.passwordLength-passwordObj.numTypes);

    // Append to char Type array in object
    if(passwordObj.useLower && j < numberOfEachChar.length){
      passwordObj.charTypeArray[0] += numberOfEachChar[j];
      j++
    }

    if(passwordObj.useUpper && j < numberOfEachChar.length){
      passwordObj.charTypeArray[1] += numberOfEachChar[j];
      j++
    }

    if(passwordObj.useSpecial && j < numberOfEachChar.length){
      passwordObj.charTypeArray[2] += numberOfEachChar[j];
      j++
    }
    
    if(passwordObj.useNumber && j < numberOfEachChar.length){
      passwordObj.charTypeArray[3] += numberOfEachChar[j];
      j++
    }

  return passwordObj;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


