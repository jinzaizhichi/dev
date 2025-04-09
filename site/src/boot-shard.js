// LICENSE: CC0
//
// https://sirupsen.com/napkin/problem-16-simulation


let n_shards = 128;
let n_sim = 1000000;
let history = [];

n_sim = 100000;

function _rand(n) {
  if (typeof n === "undefined") {
    return Math.random();
  }
  return Math.floor( Math.random()*n );
}

function _icmp(a,b) {
  if (a<b) { return -1; }
  if (a>b) { return 1; }
  return 0;
}

function partition_k_n(k, n) {

}

for (let it=0; it<n_sim; it++) {
  let booted = 0;
  let shard = [];
  let done = [];

  for (let ii=0; ii<n_shards; ii++) {
    shard.push(0);
    done.push(false);
  }

  let done_count=0;
  while (done_count < n_shards) {
    let p = _rand(n_shards);
    booted+=1;

    shard[p]++;
    if ((shard[p] >= 2) &&
        (!done[p])) {
      done[p] = true;
      done_count++;
    }

  }

  history.push(booted);
}

history.sort(_icmp);

let percentile = .9999;
let pstart = Math.floor(percentile*history.length);
let n_count = history.length - pstart;

if (n_count > 0) {
  let count=0;
  for (let i=pstart; i<history.length; i++) {
    count += history[i];
  }

  console.log(percentile, count / n_count);
}
