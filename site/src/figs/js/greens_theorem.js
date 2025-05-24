
var g_fig_ctx = {
  "two": {}
};

var g_debug = {};

function init() {

  g_fig_ctx.two = new Two({"fitted":true});
  let two = g_fig_ctx.two;


  let ele = document.getElementById("canvas_id");
  two.appendTo(ele);

  two.makeRectangle( two.width/2, two.height/2, two.width, two.height );

  let cxy = [ two.width/2, two.height/2 ];
  let wh = [130,100];

  let tri_size = 10;

  let rect = two.makeRectangle( cxy[0], cxy[1],  wh[0], wh[1]);
  rect.linewidth = 2;

  // up
  let tri0 = two.makePolygon( cxy[0], cxy[1] + wh[1]/2, tri_size, 3);
  tri0.fill = "rgb(0,0,0)";
  tri0.rotation = Math.PI/2;

  // up
  let tri1 = two.makePolygon( cxy[0] + wh[0]/2, cxy[1] , tri_size, 3);
  tri1.fill = "rgb(0,0,0)";
  tri1.rotation = 0;

  // up
  let tri2 = two.makePolygon( cxy[0], cxy[1] - wh[1]/2, tri_size, 3);
  tri2.fill = "rgb(0,0,0)";
  tri2.rotation = -Math.PI/2;

  let tri3 = two.makePolygon( cxy[0] - wh[0]/2, cxy[1] , tri_size, 3);
  tri3.fill = "rgb(0,0,0)";
  tri3.rotation = -Math.PI;


  mathjax2twojs("Omega", cxy[0] -10, cxy[1]+10, 0.035);
  mathjax2twojs("Gamma0", cxy[0] -8, cxy[1]+35 + wh[1]/2, 0.025);
  mathjax2twojs("Gamma1", cxy[0] +wh[0]/2 + 15, cxy[1]+10, 0.025);
  mathjax2twojs("Gamma2", cxy[0] -8, cxy[1]-20 - wh[1]/2, 0.025);
  mathjax2twojs("Gamma3", cxy[0] -wh[0]/2 - 35, cxy[1]+10, 0.025);



  two.update();
}


function mathjax2twojs(_id,x,y,s,s_sub,ignore) {
  s = ((typeof s === "undefined") ? 0.02 : s);
  s_sub = ((typeof s_sub === "undefined") ? 0.6 : s_sub);
  ignore = ((typeof ignore === "undefined") ? false : ignore);

  let two = g_fig_ctx.two;

  let ele = document.querySelector("#" + _id + " svg");
  let ser = new XMLSerializer();
  let str = ser.serializeToString(ele);

  let parser = new DOMParser();
  let sge = parser.parseFromString(str, "image/svg+xml").documentElement;

  let sgr = two.interpret(sge);

  sgr.position.x = x;
  sgr.position.y = y;
  sgr.scale.x =  s;
  sgr.scale.y = -s;

  if (!ignore)  {
  // rescale subscript HACK
  //
  if (_id.slice(0,2) == "m_") {

    if (true) {

    if (sgr.children.length > 0) {
    if (sgr.children[0].children.length > 0) {
    if (sgr.children[0].children[0].children.length > 1) {
    if (sgr.children[0].children[0].children[1].children.length > 1) {
        sgr.children[0].children[0].children[1].children[1].scale.x = s_sub;
        sgr.children[0].children[0].children[1].children[1].scale.y = s_sub;
    }
    }
    }
    }

    }
  }
  else {

    if (sgr.children.length > 0) {
    if (sgr.children[0].children.length > 0) {
    if (sgr.children[0].children[0].children.length > 0) {
    if (sgr.children[0].children[0].children[0].children.length > 1) {
        sgr.children[0].children[0].children[0].children[1].scale.x = s_sub;
        sgr.children[0].children[0].children[0].children[1].scale.y = s_sub;
    }
    }
    }
    }

  }
  }

  //yep, needed, so we can then get the make element
  //
  two.update();

  let mask = document.getElementById(sgr.mask.id);
  //mask.firstChild.setAttribute("d", "M -10000 -10000 L 10000 -10000 L 10000 10000 L -10000 10000 Z");
  mask.firstChild.setAttribute("d", "M -4000 -4000 L 4000 -4000 L 4000 4000 L -4000 4000 Z");

  two.update();
}


function _dl() {
  var ele = document.getElementById("canvas_id");
  let svg_txt = ele.innerHTML;
  var b = new Blob([ svg_txt ]);
  saveAs(b, "fig.svg");
}


