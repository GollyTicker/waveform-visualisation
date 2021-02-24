const VIDEO_FRAMES_PER_SECOND = 3;
const SECOND = 1;
const SECOND_TO_MILLIS = 1000;

let wave = new Wave();

let options = {};

options = {type: "dualbars blocks", stroke: 2, colors: ["white","yellow"]};

options = {type: "cubes", stroke: 2, colors: ["#fdd"]};

options = {type: "dualbars", stroke: 2, colors: ["#fdd"]};

let stream = {};

let audio = () => document.getElementById("audio");
let canvas = () => document.getElementById("canvas");
let video = () => document.getElementById("video");

let videoOptions = {mimeType: 'video/webm; codecs=vp9'};
let mediaRecorder = {};

function onDataAvailible(event) {
  console.log("Frames: ",event.data.size);
}

let running = false;

let data = [];
let renderVideo = () => {
  const url = window.URL.createObjectURL(new Blob(data, {type: 'video/webm'}));
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'test.webm';
  a.click();
  window.URL.revokeObjectURL(url);

}

let convertHandler = () => {
  if(audio().paused) {
    running = true;
    audio().play();
    mediaRecorder.start();
  }
  else {
    running = false;
    audio().pause();
    mediaRecorder.stop();
    renderVideo();
  }
}

window.onload = () => {
  wave.fromElement("audio","canvas",options);

  canvasStream = canvas().captureStream(VIDEO_FRAMES_PER_SECOND);

  mediaRecorder = new MediaRecorder(canvasStream);
  mediaRecorder.ondataavailable = (event) => {
    console.log("Data size: ", event.data.size);
    data.push(event.data);
  };

  document.getElementById("convertButton").onclick = convertHandler;
}
