
let p_i = [0,0],
    p_j = [1,0],
    p_k = [0,0];

let ds = [ 1/32, 1/32],
    R = [ [-2,2], [-2,2] ];

let Nx = Math.floor((R[0][1] - R[0][0]) / ds[0]),
    Ny = Math.floor((R[1][1] - R[1][0]) / ds[1]);


function dist2d(u,v) {
  let dx = u[0] - v[0],
      dy = u[1] - v[1];

  return Math.sqrt( (dx*dx) + (dy*dy) );
}

for (let ix=0; ix<Nx; ix++) {
  p_k[0] = ((ix/Nx) * (R[0][1] - R[0][0])) + R[0][0];
  for (let iy=0; iy<Ny; iy++) {
    p_k[1] = ((iy/Ny)*(R[1][1] - R[1][0])) + R[1][0];

    let d_ij = dist2d(p_i,p_j);
    let d_ik = dist2d(p_i,p_k);
    let d_jk = dist2d(p_j,p_k);


    if (d_ik > d_ij) {

      if (d_ik > d_jk) {
        console.log(p_k[0], p_k[1]);
      }
    }

  }
}
