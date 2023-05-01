const testObj = {one: 1, two: 2, three: 3, four: 4};
//const testObj = [1, 2, 3, 4];
function myEach(theObj, cb){
    let anotherArray = [];
    if (!Array.isArray(theObj)){ // if theObj is not an array
        const anArray = Object.values(theObj); // convert it to an array
        anotherArray = [...anArray]; // avoid mutation
    } else {
        anotherArray = [...theObj]; // theObj is an array, so just avoid mutation
    };
    // iterates over the collection of elements, passing each element in turn to the callback function
    for (const element of anotherArray){
        cb(element);
    };
    return theObj;
};

let result = myEach(testObj, alert);
if (result === testObj){
    console.log("the original after myEach is unmodified")
};

function alert(element){
    console.log(element);
};

function myMap(theObj, cb){
    let newArray = [], anotherArray = [];
    if (!Array.isArray(theObj)){ // if theObj is not an array
        const anArray = Object.values(theObj); // convert it to an array
        anotherArray = [...anArray]; // avoid mutation
    } else {
        anotherArray = [...theObj]; // theObj is an array, so just avoid mutation
    };
    // produce a new array of values by mapping each value in collection
    // through a transformation function, cb, callback
    for (const element of anotherArray){
        newArray.push(cb(element));
    }
    console.log("the original afer myMap is ", theObj);
    return newArray;
};

result = myMap(testObj, triple);
console.log("the new array from myMap is ", result);

function triple(element){
    return element*3;
};

function myReduce(theObj, cb, startingValue){
    let accu;
    let anotherArray = [];
    if (!Array.isArray(theObj)){ // if theObj is not an array
        const anArray = Object.values(theObj); // convert it to an array
        anotherArray = [...anArray]; // avoid mutation
    } else {
        anotherArray = [...theObj]; // theObj is an array, so just avoid mutation
    };
    if (startingValue === undefined){ // if no staring value
        accu = anotherArray.shift(); // set it to the first element
                                            // of the array and then,
                                            // begin with adding the triple
                                            // of the second element of the array
        let callback = cb.bind(anotherArray);
        accu = callback(accu);
    } else { // starting value is given
        accu = startingValue;
        callback = cb.bind(anotherArray);
        accu = callback(accu);
    }
    console.log("the original after myReduce is ", theObj);
    return accu;
};

function addTriples(startingValue){
    let accumulation = startingValue;
    for (const element of this){
        accumulation += triple(element);
    }
    return accumulation;
}

const acc = 10;
const reduceWithAcc = myReduce(testObj, addTriples, acc);
const reduceSansAcc = myReduce(testObj, addTriples);
console.log("reduceWithAcc is ", reduceWithAcc);
console.log("reduceSansAcc is ", reduceSansAcc);

function myFind(theObj, cb){
    let result = undefined;
    for (let item of theObj){
        if(cb(item) === true){
            result = item;
            break;
        };
    };
    return result;
};
function findInteger(item){
    return item === 4;
};
function findString(item){
    return item === "waychillgoldeneye";
};
function findObject(item){
    let r = 0;
    for (const key in item){
        if (item[key] === 'b'){
            r = 1;
        }
    }
    return r === 1;
};
const intArr = [-1, 4, 0, 1, 3, 2, 3, 4, 5, 6];
const strArr = ["maru", "choux", "doge", "coco", "waychillgoldeneye", "trance"];
const objB = {b: 'b'};
const objArr = [{a: 'a'}, objB];
const integerFound = myFind(intArr, findInteger);
const stringFound = myFind(strArr, findString);
const objectFound = myFind(objArr, findObject);
console.log("integerFound: ", integerFound);
console.log("stringFound: ", stringFound);
console.log("objectFound: ", objectFound);

function myFilter(theObj, cb){
    let anotherArray = [], theArray = [];
    if (!Array.isArray(theObj)){ // if theObj is not an array
        const anArray = Object.values(theObj); // convert it to an array
        anotherArray = [...anArray]; // avoid mutation
    } else {
        anotherArray = [...theObj]; // theObj is an array, so just avoid mutation
    };
    for (let element of anotherArray){
        if (cb(element)){
            theArray.push(element);
        };
    };
    return theArray;
};
function excluder(e){
    return e > 10;
};
const anArray = [6, 11, 5, 12, 17, 100, 9, 1, -8];
const anObj = { two: 2, three: 3, five: 5, seven: 7};
const greaterThanTen1 = myFilter(anArray, excluder);
const greaterThanTen2 = myFilter(anObj, excluder);
console.log("greaterThanTen1: ", greaterThanTen1);
console.log("greaterThanTen2: ", greaterThanTen2);

function mySize(theObj){
    let anotherArray, anotherObj;
    if (!Array.isArray(theObj)){ // if theObj is not an array
        anotherObj = Object.assign({}, theObj); // avoid mutation
        return Object.keys(anotherObj).length;
    } else {
        anotherArray = [...theObj]; // theObj is an array, so just avoid mutation
        return anotherArray.length;
    };
};
const anotherArray = [];
const anotherObj = {};
console.log("t1: ", mySize(anArray));
console.log("t2: ", mySize(anObj));
console.log("t3: ", mySize(anotherArray));
console.log("t4: ", mySize(anotherObj));

function myFirst(anArray, n){
    let anotherArray = anArray.slice();
    if (anotherArray.length > 0){ // not empty
        if (n === undefined){ // set the default to 1
        n = 1;
        };
        if (n === 1){
            return anotherArray.shift();
        } else if (n > 1 && n <= anotherArray.length) {
            return anotherArray.slice(0, n);
        } else{
            return "n is bigger than the length of the array"
        };
    } else{
        return "Empty Array!";
    };
};
const array1 = [1, 2, 3, 4];
const array2 = [];
console.log("F1: ", myFirst(array1));
console.log("F2: ", myFirst(array1, 1));
console.log("F3: ", myFirst(array1, 2));
console.log("F3-1: ", myFirst(array1, 3));
console.log("F3-2: ", myFirst(array1, 4));
console.log("F4: ", myFirst(array1, 5));
console.log("F5: ", myFirst(array2));
console.log("F6: ", myFirst(array2, 2));

function myLast(anArray, n){
    let anotherArray = anArray.slice();
    if (anotherArray.length > 0){ // not empty
        if (n === undefined){ // set the default to 1
        n = 1;
        };
        if (n === 1){
            return anotherArray.pop();
        } else if (n > 1 && n <= anotherArray.length) {
            return anotherArray.slice(-n);
        } else{
            return "n is bigger than the length of the array"
        };
    } else{
        return "Empty Array!";
    };
};
console.log("L1: ", myLast(array1));
console.log("L2: ", myLast(array1, 1));
console.log("L3: ", myLast(array1, 2));
console.log("L3-1: ", myLast(array1, 3));
console.log("L3-2: ", myLast(array1, 4));
console.log("L4: ", myLast(array1, 5));
console.log("L5: ", myLast(array2));
console.log("L6: ", myLast(array2, 2));

function myKeys(anObj){
    let keyArray = [];
    let anotherObj = Object.assign({}, anObj);
    for(const key in anotherObj){
        keyArray.push(`${key}`);
    };
    return keyArray;
};
console.log("keyArray: ", myKeys(anObj));

function myValues(anObj){
    let valueArray = [];
    let anotherObj = Object.assign({}, anObj);
    for(const key in anotherObj){
        valueArray.push(anotherObj[key]);
    };
    return valueArray;
};
console.log("valueArray: ", myValues(anObj));
