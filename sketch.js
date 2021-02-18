let scribble;
var distance;
var margin;

//built in function to p5js, it runs once
function setup() {
  createCanvas(windowWidth, windowHeight);
  let d = select('.div-block');
  d.position(0,0);
  //set up Gui class
  gui = new Gui();
  //set up individual panel
  let gui_setup = new dat.GUI();
  gui_setup.add(gui, 'Circles', 0, 15).step(1).onChange(update);
  gui_setup.add(gui, 'Scale', 10, 75).step(1).onChange(update);
  gui_setup.add(gui, 'strokeWeight', 1, 10).step(1).onChange(update);
  gui_setup.add(gui, 'randomScale');
   gui_setup.add(gui, 'margin', 0, .5).step(.125).onChange(update);
     gui_setup.add(gui, 'ymargin', 0, .5).step(.125).onChange(update);
  gui_setup.add(gui, 'xspacing', .125, .25).step(.125).onChange(update);
  gui_setup.add(gui, 'yspacing', .125, .25).step(.125).onChange(update);

  gui_setup.addColor(gui,'color').onChange(update);
 gui_setup.addColor(gui,'bColor').onChange(update);


  rectMode(CENTER);



  noFill();
  scribble = new Scribble();
}

function draw() {
  background(gui.bColor);


  for (let i = windowWidth * gui.margin; i <= windowWidth * (1 - gui.margin); i += windowWidth * gui.xspacing) {
    for (let y = windowHeight * gui.ymargin; y <= windowHeight * (1-gui.ymargin); y += windowHeight * gui.yspacing) {
      if (gui.randomScale) {
        distance = random(gui.Scale);
      } else {
        distance = gui.Scale;
      }
      target(i, y, distance, gui.Circles);
    }
  }


  noLoop();
}

//create function with 4 arguments/variables to use later
function target(xPos, yPos, steps, num) {
  //pass in variables 
  strokeWeight(gui.strokeWeight);
  stroke(gui.color);
  for (var i = 0; i <= num; i++) {
    scribble.scribbleEllipse(xPos, yPos, steps * i, steps * i);
  }
}

function update() {
  redraw();
}



function Gui() {
  this.Circles = 4;
  this.Scale = 50;
  this.strokeWeight = 4;
  this.margin = .25;
  this.ymargin = .25;
  this.xspacing = .25;
  this.yspacing = .25;
  this.randomScale = false;
  this.color = '#ffffff';
  this.bColor = '#35a0ff';

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}