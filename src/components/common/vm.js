const vm = require('vm');

const x = 1;

const context = { x: 2 };
vm.createContext(context); // Contextify the object.

let code = 'function foo(a,b) { return a+b; }; solutionFoo';
code = code.replace('const', 'var');
// `x` and `y` are global variables in the context.
// Initially, x has the value 2 because that is the value of context.x.
vm.runInContext(code, context);

console.log(context.x); // 42
console.log(context.y); // 17
console.log(context);
console.log(context.foo(10, 11));

console.log(x); // 1; y is not defined.
