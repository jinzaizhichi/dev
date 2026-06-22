Developing a LISP interpreter: Lessons Learned
===

This is an article on lessons learned while developing a LISP
interpreter.
The target audience is my current and future self to articulate
some curated points of interest I learned during the course of implementation.

Implementation
---

The current interpreter is available at [lsp.js (v0.1.0)](src/lsp.js).

It still has a many rough edges.
As spot tests, it can do basic math, recursive functions (e.g. `fibonacci`)
and the [Y combinator](https://8dcc.github.io/programming/understanding-y-combinator.html).

### Operations

The most useful operations are:

| op | description | example |
|---|---|---|
| `+`,`-`,`/`,`*` | Plus, minus, divide, multiplication, respectively | `(+ 3 4)` |
| `d` | Definition | `(d x 1)` |
| `f` | Function definition (Lambda)| `(f (x) (+ x 1))` |
| `if` | If | `(if (= x 0) 1 (- x 1))` |
| `q` | Quote | `(q (+ 3 4))` |
| `e` | Eval | `(e (q (+ 3 4)))` |
| `@` | 'At' position in array | `(@ 1 (q (+ 3 4)))` |

There are a few others but these are the main ones that allow for non-trivial
actions in the language.

### Structure

The main loop is:

```
  Tokenize -> Build Abstract Syntax Tree (AST) -> Evaluate
```

* Tokenization - read input into logical tokens (an array of character strings) without doing any further processing
* Build AST - build a syntax tree and interpret tokens into their base values (numbers, functions, keywords, etc.)
* Evaluate - interpret the AST

In my opinion, the separation between each of these steps is blurrier than most people like to admit but
as a high level overview, the categorization helps.

*Tokenization* results is an array of character tokens that will be interpreted at a later step.
*Tokenization*'s job is to pre-digest input so that it can be processed more easily in the *Build AST* step.

There are some fundamental types, in my case numbers, symbols, arrays and language keywords, which
the *Build AST* step is meant to categorize.
This is essentially the difference between saying something grammatically correct without worry about the content.

Assuming *Tokenization* and *Build AST* went successfully, *Evaluate* executes the AST.

Put another way, *Tokenization* is a simple set of regex run on the input to create an array of strings.
The array of strings is parsed by *Build AST* to construct a tree and make sure there is a superficial
grammar that's been adhered to.
*Build AST* runs on the AST to see what the result is.

A commonality with structures that are passed and returned, is that they are JSON structures with a `type`, optional `val` and `msg`
entries.
Errors are of the flavor `{ "type": "E", "msg": "..." }` and numbers are e.g. `{ "type": "n", "val" : 1.2 }`.
Arrays have a `child` entry which is an array of values.
Procedures have a `param` entry which holds the parameters, `val` which holds the body of the function and `env` which
holds a reference to the environment that the procedure was declared in.

It might be convoluted but I opted to parse functionality at the array level rather than the evaluated token level.
Meaning, the array elements are processed and depending on what the first element resolves to the rest of the array
is processed accordingly.
This means that a function deceleration (e.g. "lambda") token is resolved to something like `{ "type": "f" }`,
which is then interpreted on layer above the AST processing recursion which will collect the other elements
in the array for preparation to create a lambda.

### Environments

The environment is the the concept or structure that allows variable lookups by name.

The environment is implemented as a simple JSON structure with variable name elements as entries
along with an `id`, `par` parent pointer, `child` child array pointer and `_lvl` to indicate depth
of the environment tree.

For example, here is the base level "common environment" defined in `lsp.js`:

```
var COMMON_ENV = {
  "+" : { "type": "p", "n_param": -1, "func": function() { return _lsp_bop( _lsp_symb('+'), ...arguments); } },
  "-" : { "type": "p", "n_param": -1, "func": function() { return _lsp_bop( _lsp_symb('-'), ...arguments); } },
  "*" : { "type": "p", "n_param": -1, "func": function() { return _lsp_bop( _lsp_symb('*'), ...arguments); } },
  "/" : { "type": "p", "n_param": -1, "func": function() { return _lsp_bop( _lsp_symb('/'), ...arguments); } },

  ...

  "id": "0000",
  "par": undefined,

  "child": [],

  "_lvl": 0
};
```

(above edited for brevity)

For every new node when processing the AST, a new environment is created with the parent environment as the new environment's
parent and the parent environment adding it as a child.

When looking up a variable, the environment's implied tree is traversed from the current environment
up through the chain of parents.
The traversal continues until it either finds the named entry or reaches an undefined parent, indicating the
root environment was reached without finding the lookup resulting in an error.

Lambda's, when created, have an additional `env` element that is populated with the current environment
from when they were created.
The environment from the `env` entry is then used when calling the lambda (not, for example, the environment
at the calling point).

Lessons Learned
---

### Environments Are Fundamental

Perhaps obvious to most but not obvious to me was the importance of environments.
Getting them wrong results in subtle and not-so-subtle bugs.

When reading tutorials or references, parsing and building the AST were always treated
in depth where environments felt like they were an afterthought.
This may be because I'm naive or tokenization and AST processing need to come before
a discussion on environments but, for whatever reason, I never internalized
the importance of environments and how they are a fundamental building block of languages.

One bug I ran into was in creating environments for Lambda functions.
The Lambda function needs to have an environment of *where it was created*,
not *where it's called*.
Again, perhaps obvious to everyone else, but this tripped me up.

In retrospect, this is something I knew but failed to implement correctly the first time around.

For example, a common issue that trips of JavaScript programmers:

```
var F = [], G = [], I=0;
function foo() {
  for (let i=0; i<3; i++) {
    F.push( function() { console.log(i); } );
  }
}
function bar() {
  for (let i=0; i<3; i++) {
    G.push( function() { console.log(I); } );
  }
}
foo();
bar();
for (let i=0; i<F.length; i++) { F[i](); }
for (I=0; I<G.length; I++) { G[I](); }
```

`F` and `G` are both arrays of Lambdas and both have references environments relative to
their declaration.
`F` has a local variable, `i`, which gets incremented to `3` so that when an entry of `F` is
called it references the current state of `i`.
It doesn't matter that the context is long forgotten by everything else after `foo` has been
called as entries of `F` still keep a reference.

`G` is almost identical, but now references the global `I` variable, which gets incremented
in the loop and so the output is "as expected".

In my implementation, the following is the relevant portion (edited for brevity):

```
    if (u.type == 'P') {

      let _parm = u.param;
      let _proc = u.val;
      let _p_env = u.env;

      let _local_env = _lsp_env_new(u.env);
      for (let i=0; i<_parm.child.length; i++) {

        // Each parameter needs to be evaluated in the *calling* environment.
        // Once parameters have been resolved, the local environment
        // where the lambda was defined is then used.
        //
        let _ev = _eval( _a[i+1], _child_env );

        if (_ev.type == 'E') {
          return { "type":"E", "msg": "P param eval (" + i.toString() +"): " + _ev.msg };
        }

        _local_env[ _parm.child[i].val ] = _ev;
      }

      return _eval( _proc, _local_env );
    }
```

Parameters to the Lambda are evaluated in the calling environment using `_child_env`.
The evaluation of the parameters is added to the local environment where the
local environment is taken from `u.env`, the environment at *declaration*.

The `_local_env` is then used in `_eval( _proc, _local_env)`, so that the evaluation
occurs with the environment relative to the Lambda declaration, with the new parameters
added.

More succinctly:

* Lambda parameters are evaluated relative to the *calling* environment
  - parameter evaluations are added to the local environment of the Lambda
* Lambda evaluation (body of function) is evaluated relative to the *declaration* environment
  - I'm calling this the 'local environment of the Lambda'

In some sense, the environment is a pretty simple concept, but there are (in my opinion)
some hidden subtleties to get it right.

Environments are pretty much a straight tree, with entries the evaluated values and
pointers to the parent and children, so all the standard tree traversal mechanics
apply when looking up, adding and removing (if need be).
Understanding how to use the environment relative to the AST is the subtlety.

In a previous iteration, I added an environment to each node of the AST.
I eventually opted to separate them and pass them into the evaluation function,
with references to the environment (as in the Lambda `P` node) when needed.
I found the separation to be clearer to think about and more easy to implement
without special cases for the `_eval` function.

### Tokenization Can Be Simple

Again, perhaps an obvious point to many but tokenization is (necessarily?)
easy.

This amounts to nothing more than passing a regular expression over the input
to make sure it's parsed in a easily digestible way for later processing.

Here is the tokenization I use (edited for brevity):

```
function tokenize( _line ) {
  let __line = _line
    .replace( /\(/g, ' ( ')
    .replace( /\)/g, ' ) ')
    .trim();
  let _tok = __line.split( /  */g);
  return _tok;
}
```

Building the AST requires parenthesis counting, categorizing elements, etc.
which is also pretty straight forward, but this task is made all the more
streamlined when input has been sanitized for easy processing.

Maybe a more meta lesson is that separating the process into easily
digestible portions so that each part can focus on its domain of
interest is the better takeaway.

### There Are Many Paths to Correctness

More of a wishy-washy lesson, but for some reason I got hung up on
implementing a Lisp interpreter "the right way".
There is no right way.

My Lisp interpreter is janky, has many rough edges, is difficult to use, understand
and has a host of other problems but it is a Lisp interpreter.
I can do processing, implement functions and, in my mind the certificate of authenticity,
implement the Y combinator:

```
;(d Y
;   (f (g)
;      ((f (x) (g (f (n) ((x x) n))))
;       (f (x) (g (f (n) ((x x) n)))))))

(d Y (f (g) ((f (x) (g (f (n) ((x x) n)))) (f (x) (g (f (n) ((x x) n)))))))

;(d fg
;   (f (self)
;      (f (n)
;         (if (= n 0)
;           1
;           (* n (self (- n 1)))))))

(d fg (f (self) (f (w) (if (= w 0) 1 (* w (self (- w 1)))))))

(d factorio (Y fg))
(factorio 5)
```

My implementation is probably very inefficient, is clunky in a lot of ways
and is heavily focused on returning one or two types (numbers and/or symbols/functions)
but as a proof of concept for myself to have a working implementation, it works.

I process lists as the fundamental object, relying on the evaluated tokens
to know how to process the latter elements of the list.
Knowing which environment to create or use in this context can be a little confusing
because there's this layer of indirection where I return a function type, say
but then only process it as a function in the evaluation level that's processing
the array.

Part of the reason I implemented it in this way was that I wanted to not rely
on host language features to implement core Lisp features.
Norvig's tutorial relies heavily on Python's syntax which makes for a streamlined
implementation but leans heavily on features available in the host language.
For me, at least, this obscured some insight into what was going on and how to implement it.

I doubt C has this pitfall but doing string processing in C (or even C++) I find
to be difficult, so I opted for a compromise language of JavaScript.

In the end, I tried to be less self conscious about what the "right" way was and
tried to implement it in a way that made sense to me, even if it was clunky.

### Visualization

This is more of a general idea that I try to implement in my projects but
visualization, for me, is key to understanding.

I rarely get things working on the first try and debugging becomes difficult
when there are many environments, branches and other context queues that need
to be interpreted.
Often, in this project and others, there needs to be a certain base complexity
before bugs show up or features are stressed.

In order to help debugging, visualization is key.
For this project it was as simple as creating custom printing statements that showed
the environment stack (with custom UUIDs), AST and other information.

I've found each project requires a domain specific visualization to be useful,
with a lot of trial and error to discover what the signal is that is most useful
for visualization.


Editorial
---

I try to have a general policy of not shit-posting, so this section might be a violation
of that idea, but I hope there's enough good faith ideas to make it worth while.

I had previously considered Lisp to be an over-hyped language.
I believe this was mostly in response to the benefits people claimed it gave.

My interpretation of the main points are:

* Lisp offers a *different way of thinking about problems* that makes some solutions transparent
  - Related, Lisp offers a language framing to help describe problems in a way where their solution
    becomes more intuitive
* Lisp provides an ideal of how to create a language without side-effects so that we can more easily
  reason about programs
* Lisp offers a succinct implementation that has powerful features of languages that we want for
  more complex tasks
  - In particular, treating functions/code as data and then treating data as code allows for
    easy access to powerful features that many other languages don't have or are difficult to use

In my opinion, each of these ideas are incorrect in various ways.

I don't ascribe to any sort of strong form of [linguistic relativity](https://en.wikipedia.org/wiki/Linguistic_relativity).
Many non-trivial problems that Lisp solves are ones that the constraints of the language invent in the first place.
Any insight into problem structure that can be claimed from Lisp can most likely be explained by imposing a tree structure,
independence or using introspection ("code-as-data and vice versa") idea.
These are paradigms that have been expressed in many other contexts before and I've never been impressed with Lisp
providing any fundamental new insight.

In terms of independence and side effects, while I can see the utility of side effect free computation, there are two
main critiques I have:

* Any Lisp computation can be effectively made side-effectful by passing the whole environment up
  and down the call tree, destroying any concept of separation
* There's a deeper desire to debilitate Turing machine equivalence to provide provably terminating computation
  and I suspect that the strength of computations that we typically want to do is deeply tied to being Turing machine
  equivalent

My feeling is that for the tasks we typically want to do, it's easier to start from Turing machine equivalence and then back
into provably terminating behavior than to start from an incapacitated Turing machine and then hope that the additions we
make doesn't give us full Turing machine equivalence.
Another way to say that is Turing machine equivalence is the norm, not the exception and one has to work hard to avoid Turing
machine equivalence.
One has to work even harder to have a system that's not Turing machine equivalent that still does useful work.

It might be my naivete but it's clear that Lisp and the related Lambda calculus are Turing machine equivalent, including
prizing the introspection idea, so using this as a basis side-effect free ideology seems hypocritical.

Lisp does offer a way to implement a succinct implementation of a powerful language.
Lisp has been around since the 1960s with the ability to run on hardware throughout the history of personal computing.
My feeling is that the ease of implementation and ubiquity of availability has biased people to it's utility, much 
like people's bias towards the virtues of their first learned programming language.
I find Lisp clunky and difficult to do complex tasks in and so I think a large part of why some people are Lisp
advocates is their "first language bias".
They see the potential but can never quite realize it.

In particular, AI research in past decades used to be heavily focused on Lisp like languages.
I believe Lisp has its benefits but I think it's clear that any good ideas Lisp has can be easily
transferred to other domains and that Lisp offers little power over other methods for AI research.

Even the Y combinator idea seems like a historical vestige of a mathematical though pattern prevalent over a century ago.
I don't want to be unkind and maybe part of the reason why we consider introspection and Turing machine equivalence
as such basic and ubiquitous objects is precisely because of this research, but, in my opinion,
understanding the Y combinator or the other subtleties of Lambda calculus have done little to move
forward AI research, computing or deeper insight into complexity.

The above are the many reasons I've shied away from using or implement Lisp.
I've implemented other language interpreters (e.g. GCode) but never one that
I would consider a "proper" language and certainly not one that has introspection
as a first class idea.

In some sense, the very reason I didn't like Lisp in the first place is the reason
why it's so enlightening.
Lisp can be a powerful language, especially for niche areas where a DSL is needed,
and its implementation simplicity make it a good candidate for those areas.
The simplicity in implementation while still capturing the core concepts of language
design make it a good candidate to learn language and compiler design.

Having implemented a Lisp, even if it's just a taste,
I feel much more comfortable in understanding compilers and language design.
The focus on environments was, alone, worth the time to implement it.

The above does sound pretty negative and I'm not sure if it's worth saying.
I don't feel strongly about my critiques, especially now that AI research is progressing
so quickly, and I can see many benefits from the ideas that Lisp has to offer.
I have to stop myself from becoming enamored by Lisp because I know how clunky it is to use.


References
---

* [(How to Write a (Lisp) Interpreter (in Python)) - Peter Norvig](https://norvig.com/lispy.html)
* [90 loc c++ lisp](https://github.com/anthay/Lisp90/blob/master/lisp90.cpp)
* [Understanding the Y combinator - 8dcc](https://8dcc.github.io/programming/understanding-y-combinator.html)

###### 2026-06-21

