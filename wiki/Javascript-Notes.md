Javascript Notes
===

Scoping Issues with Anonymous Functions
---

Consider the following:

```
let f = [], i=0;
while (i<2) {
  f.push( function() { return i; } );
  i++;
}
for (let j=0; j<f.length; j++) {
  console.log(f[j]());
}
```

This will result in:

```
2
2
```

To fix:

```
let f = [], i=0;
while (i<2) {
  f.push( (function(t) { return function() { return t; }; } )(i) );
  i++;
}
for (let j=0; j<f.length; j++) {
  console.log(f[j]());
}
```

Functions as Classes
---

([SO](https://stackoverflow.com/questions/11970141/javascript-whats-the-difference-between-a-function-and-a-class), [blog](https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up))

```
function foo(x) {
  this.x = x;
  this.s = 'foo';
}

foo.prototype.F = function()  { console.log(this.x, this.s); }
foo.prototype.G = function(x) { this.x = x; }

let bar = new foo(1);
bar.F()
bar.G(2);
bar.F();
```

Results in:

```
1 foo
2 foo
```

Variable Scope
---

([SO](https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript))

It gets pretty complicated.


Yield
---

```
unction *h1(x) {
  console.log("h1.0:x", x);
  yield 9;
  x++;
  console.log("h1.1:x", x);
  yield 10;
  x++;
  console.log("h1.2:x", x);
  yield 11;
  x++;
  console.log("h1.3:x", x);
  return -2;
}

function *h0(x) {
  let v = yield* h1(x);
  console.log("h0>", v);
  return -1;
}

function _h(x) {

  let hgen = h0(x);
  let hv = {};
  for (hv = hgen.next(); !hv.done; hv = hgen.next()) {
    console.log("_h>", hv);
  }

  console.log("fin>", hv);
}

_h(127);
```

```
h1.0:x 127
_h> { value: 9, done: false }
h1.1:x 128
_h> { value: 10, done: false }
h1.2:x 129
_h> { value: 11, done: false }
h1.3:x 130
h0> -2
fin> { value: -1, done: true }
```


