const VIDEO_FRAMES_PER_SECOND = 10;
const SECOND = 1;
const SECOND_TO_MILLIS = 1000;

let wave = new Wave();

let options = {};

options = {type: "dualbars blocks", stroke: 2, colors: ["white","yellow"]};

options = {type: "cubes", stroke: 2, colors: ["#fdd"]};

options = {type: "dualbars", stroke: 2, colors: ["#fdd"]};

let encoder = {};

let audio = () => document.getElementById("audio");
let canvas = () => document.getElementById("canvas");
let video = () => document.getElementById("video");

let addFrame = () => {
  encoder.add(canvas());
}

let renderVideo = () => {
  encoder.compile(false,(output) => {
      let URL = (window.webkitURL || window.URL);
      const url = URL.createObjectURL(output);
      video().src = url;
    }
  )
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

window.onload = () => {
  wave.fromElement("audio","canvas",options);
  document.getElementById("convertButton").onclick = convertHandler;
  encoder = new Whammy.Video(VIDEO_FRAMES_PER_SECOND);
}
