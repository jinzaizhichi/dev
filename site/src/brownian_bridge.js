// LICENSE: CC0
//

// references:
// https://xilinx.github.io/Vitis_Libraries/quantitative_finance/2021.1/guide_L1/brownian/bb.html

//---
// CC-BY-SA 4.0 Maxwell Collard https://stackoverflow.com/a/36481059/4002265
// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean, stdev) {
  mean = ((typeof mean === "undefined") ? 0 : mean);
  stdev = ((typeof stdev === "undefined") ? 1 : stdev);

  let u = 1 - Math.random(); // Converting [0,1) to (0,1]
  let v = Math.random();
  let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

  // Transform to the desired mean and standard deviation:
  //
  return z * stdev + mean;
}
//---

function Winer(t, seed) {
  let c = Math.sqrt(t);
  let N = gaussianRandom(0,1);
  return c*N;
}

function dWiener(dt) {
  let c = Math.sqrt(dt);
  let N = gaussianRandom(0,1);
  return c*N;
}

function BrownianBridge(a, b, T, dt) {

  let n = Math.ceil(T / dt);
  let w = [];
  let B = [];

  w.push(dWiener(dt));
  for (let it=1; it<n; it++) {
    t = it/n;
    w.push(dWiener(dt) + w[it-1]);
  }

  for (let it=0; it<w.length; it++) {
    t = it/n;
    B.push( (a*(T-t)/T) + (b*t/T)  + (w[it] - (t*w[w.length-1]/T)) );
  }

  return B;
}

function sandbox() {

  //for (let i=0; i<10000; i++) { console.log(gaussianRandom(), 1); }
  //

  let dt = 1/32;

  let w = [];

  let n = 1000;
  w.push(dW(dt));
  for (let it=1; it<n; it++) {
    t = it/n;

    w.push(dW(dt) + w[it-1]);
  }

  //for (let i=0; i<w.length; i++) { console.log(i, w[i]); }


  //for (let i=0; i<n; i++) { let t = i/n; console.log(t, W(t)); }
}

let b = BrownianBridge(3,10, 1, 1/1024);

for (let i=0; i<b.length; i++) {
  console.log(i, b[i]);
}

