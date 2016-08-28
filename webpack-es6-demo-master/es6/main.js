import Point from './Point.js';

let hello = { x: 10, y: 20 };

console.log(hello);
console.log({...hello, x: 15});
console.log({ x: 15, ...hello});

var body = document.querySelector('body');
body.textContent = 'Good point: ' + new Point(1, 23);
