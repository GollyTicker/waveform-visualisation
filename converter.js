const VIDEO_FRAMES_PER_SECOND = 15;
const SECOND = 1;
const SECOND_TO_MILLIS = 1000;
const FPS_AS_MILLIS = SECOND / VIDEO_FRAMES_PER_SECOND * SECOND_TO_MILLIS;

let wave = new Wave();

let options = {};

options = {type: "dualbars blocks", stroke: 2, colors: ["white","yellow"]};

options = {type: "cubes", stroke: 2, colors: ["#fdd"]};

options = {type: "dualbars", stroke: 2, colors: ["#fdd"]};

let audio = () => document.getElementById("audio");
let canvas = () => document.getElementById("canvas");
let video = () => document.getElementById("video");

let encoder = new Whammy.Video(VIDEO_FRAMES_PER_SECOND);
console.log("Initialised encoder.")

let addFrame = () => {
  const ctx = document.getElementById('canvas').getContext('2d');
	ctx.fillStyle = 'white';
  ctx.fillRect(0,0,400,90);
  ctx.fillStyle = 'black';
  ctx.fillRect(40,40,80,80);
  encoder.add(document.getElementById('canvas').getContext('2d'));
}

let timer = 0;

let convertHandler = () => {
  if(audio().paused) {
    console.log("Start. Call every ",FPS_AS_MILLIS," ms");
    audio().play();
    timer = setInterval(addFrame, FPS_AS_MILLIS);
  }
  else {
    console.log("Stop.");
    audio().pause();
    clearInterval(timer);
      console.log("Compiling...");
      var output = encoder.compile();
      console.log("Found data: ", output.toString());
      document.getElementById("video").src = webkitURL.createObjectURL(output);
  }
}

window.onload = () => {
  wave.fromElement("audio","canvas",options);
  document.getElementById("convertButton").onclick = convertHandler;
}
