// function cookmaggie(maggie, pani, tapeli) {
//     console.log("your maggie wiil be ready in"
//     + maggie * 2
//     + "and ingredients used in are:-"
//     + maggie + "maggie"
//     + pani + "Cup of water"
//     + "using" + tapeli + "pan")
// }
// cookmaggie(4, 8, 1);

// let bread1 = prompt("Which bread would u like to have");
// let veggies1 = prompt("Which veggies would u like to have");
// let sauce1 = prompt("Which sauce would u like to have");

// function makesandwich(bread, veggies, sauce) {
//     let sandwich = bread + " bread " + veggies + "veggies" + sauce + " sauce " + " Ur sandwich is ready";
//     return sandwich;
// }

// let vegsandwich = makesandwich(bread1, veggies1, sauce1);
// console.log(vegsandwich);


// let fun = 'This is the first javascript';
// let firstName = 'Ram';
// let lastName = 'Sita';
// console.log(fun, firstName, lastName);

// let interestrate = 0.3;
// interestrate = 1;
// console.log(interestrate);

// let names = ['malan','david'];
// names[2] = 'faf';
// console.log(names);

// function greet(firstNames, lastNames ){
// console.log('Hello' + firstNames + ' ' + lastNames );
// }
// greet(' John','smith' );

// function square(number){
// return number * number;
// }
// console.log(square(12));

/////////////////// Arithmetic Operator /////////////////////

// let x= 10;
// let y = 11;

// console.log(x + y);
// console.log(x - y);
// console.log(x * y);
// console.log(x % y);
// console.log(x ** y);

// console.log(x++);
// console.log(++x);
// console.log(x--);
// console.log(--x);

//////// Assigment Operator ////////////////////////

// let x = 10;
// x = x + 5;
// x += 5;

// x = x * 3;
// x *= 3;

////////////// Comaprison Operator ///////////////////

// let x = 1;

// console.log(x > 0);
// console.log(x >= 1);
// console.log(x < 1);
// console.log(x <= 1);
// console.log(x + x);
// console.log(x === 1);
// console.log(x !== 1);


////////////// Equality Operator ///////////////

// console.log(1 === 1);
// console.log('1' === 0);


// console.log(1 == 1);
// console.log('1' == 1);
// console.log(true == 1);


/////////////// Ternary Operator /////////////////

// let points = 100;
// let type = points > 100 ? 'Gold' : 'Silver';

// console.log(type);

// const points = 110;
// const type = points >100 ? 'gold' :'Silver';

// console.log(type);

// let userColor = undefined;
// let defaultColor = 'blue';
// let currentColor = userColor || defaultColor;

// console.log(currentColor);

////////////// Bitwise Operator ////////////////

// const readPermission = 4;
// const writePermission = 2;
// const executePermission = 1;

// let myPermission = 0;
// myPermission = myPermission | writePermission;

// let message = (myPermission & readPermission) ? 'yes' : 'no';

// console.log(message);

///////////////// Operator Precedence ///////////////

// let num = 15 + 3 * 4;

// console.log(num);


///////////////// Pratice Exercise ///////////////

// Swaping to variable
// let a = 'red';
// let b = 'blue';

// let c = a;
// a = b;
// b = c;

// console.log(a);
// console.log(b);

//// IF ELSE Statment //////////////

// let hour = 10;

// if (hour >= 6 && hour < 12)
//     console.log('Goodmorning');
// else if(hour >= 12 && hour <18)
//     console.log('GoodAfternoon');
// else
//     console.log('GoodEvening');

////// Switch case ///////////

// let role = "1";

// switch (role){
//     case '1':
//     console.log('Mercedes Maybach');
//     break;
    
//     case '2':
//     console.log('Porsche 911 Turbo');
//     break;

//     default:
//         console.log('Undefined car');


// }


///////////// For Loop //////////////////

// for(i = 0; i < 5; i++){
//     console.log("Hello World",i);
// }

////////// While loop ////////////
// for (let i = 0; i <= 5; i++){
//     if (i % 2 !==0) console.log(i);
// }

// let i = 0;
// while (i <= 5) {
//    if (i % 2 !==0) console.log(i);
//    i++; 
// }

//////////// Do While /////////////////

// let i = 0;
// do{
//     if (i <= 5) 
//     i++;
// }
// while(i <= 5);

// let i = 0;
// do{
//     if(i <= 5)
//     i++;
// }
// while(i <= 5);
// console.log(i);

//////////////// infinite Loop /////////////////
// let i = 0;
// while (i < 10){
//     console.log(i);
//     i++;
// }

// let person = {
//     names: "David",
//     Gender: "Male",
//     Age: 35
// };
// for(let key in person)
//    console.log(key, person[key]);

//////////// For in Loop //////////////

// const colors =['red', 'grey', 'blue'];
//    for(let index in colors)
//    console.log(index, colors[index]); 


   ///////////  For of Loop //////////////
//    for (let color of colors)
//    console.log(color);

////////////////// Practice Exercise

// let number = max(9,16);
// console.log (number); 

// function max(a, b){
// return (a > b) ? a : b;
// }


// console.log(island(800,600));

// function island(width,height){
// return(width > height); 
// }


/////////// FIZZBUZZ Exercise ///////////

const output = fizzBuzz(30);
console.log(output);

function fizzBuzz(input) {
   if (typeof input !== 'number')
   return 'Not a Number';

   if ((input % 3 === 0) && (input % 5 === 0))
   return 'FizzBuzz';

   if (input % 3 === 0)
   return 'Fizz';

   if (input % 5 === 0)
   return 'Buzz';

   return input;
}