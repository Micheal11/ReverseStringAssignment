//boolean
let isDone: boolean = false;

//Numbers
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

//String
let color: string = "blue";
color = 'red';

//template strings
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;

// sentences
let sentencing: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

// array
let list: number[] = [1, 2, 3];

//generic array type
let listArray: Array<number> = [1, 2, 3];

//tuple
//Tuple types allow you to express an array where the type of a fixed number of elements is known, but need not be the same. For example, you may want to represent a value as a pair of a string and a number:

// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
//x = [10, "hello"]; // Error


console.log(x[0].substr(1)); // OK
//console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

//When accessing an element outside the set of known indices, a union type is used instead:

x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

//x[6] = true; // Error, 'boolean' isn't 'string | number'

enum Color {Red, Green, Blue}
let c: Color = Color.Green;

//further enum
enum ColorRepeat {Red=1, Green, Blue}
let a: Color = Color.Green;

//enum conti
enum ColorConti {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

