const VIDEO_FRAMES_PER_SECOND = 30;
const SECOND = 1;
const SECOND_TO_MILLIS = 1000;

window.bgColor = "#005";

let wave = new Wave();

let options = {};

options = {type: "dualbars blocks", stroke: 2, colors: ["white","yellow"]};

options = {type: "cubes", stroke: 2, colors: ["#fdd"]};

options = {type: "dualbars", stroke: 2, colors: ["#fdd"]};

const encoder = new Whammy.Video(VIDEO_FRAMES_PER_SECOND);

let audio = () => document.getElementById("audio");
let canvas = () => document.getElementById("canvas");
let video = () => document.getElementById("video");

let addFrame = () => {
  encoder.add(canvas().getContext("2d"));
}

let renderVideo = () => {
  const output = encoder.compile();
  let URL = (window.webkitURL || window.URL);
  const url = URL.createObjectURL(output);
  video().src = url;
}

let timer = 0;

let convertHandler = () => {
  if(audio().paused) {
    audio().play();
    timer = setInterval(addFrame, SECOND / VIDEO_FRAMES_PER_SECOND * SECOND_TO_MILLIS);
  }
  else {
    audio().pause();
    clearInterval(timer);
    renderVideo();
  }
}

function drawBackgroundCanvas() {
  const ctx = canvas().getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0,0,400,90);
}

window.onload = () => {
  document.body.style.backgroundColor = bgColor;
  wave.fromElement("audio","canvas",options);
  drawBackgroundCanvas();
  document.getElementById("convertButton").onclick = convertHandler;
}

const handleUploadedFile = (file) => {
  audio().src = URL.createObjectURL(file);
}
