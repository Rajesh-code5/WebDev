// function body

// callMe();

function callMe( name ){
    console.log("Call me function called !!");
    console.log(name + " Says Hi !!!");
    return 10;
}

// function invocation/call
console.log( callMe  );

let rVal = callMe("Joshi");
console.log( rVal );
// functions and variable me koe difference nhi hai

callMe( "steve" );
// Functions can be passed as a argument in a function and also they can be returned from the function just like variables !


// let sayHi; // undefined

sayHi();

// valid syntax
function sayHi(){
    console.log("Function says Hiii !!!");
}

sayHi();




// High Order Functions and CallBack Functions