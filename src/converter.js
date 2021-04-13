const VIDEO_FRAMES_PER_SECOND = 30;
const SECOND = 1;
const SECOND_TO_MILLIS = 1000;

window.bgColor = "#5271FF";

let wave = new Wave();

let options = {};

options = {
  type: "dualbars blocks",
  stroke: 2,
  colors: ["white", "yellow"]
};

options = {
  type: "cubes",
  stroke: 2,
  colors: ["#fdd"]
};

options = {
  type: "dualbars",
  stroke: 2,
  colors: ["white"]
};

let encoder = undefined;

let resetEncoder = () => {
  encoder = new Whammy.Video(VIDEO_FRAMES_PER_SECOND);
};

let audio = () => document.getElementById("audio");
let canvas = () => document.getElementById("canvas");
let video = () => document.getElementById("video");
let recordingIndicator = () => document.getElementById("recordingIndicator");

const isRecordingText = "RECORDING";
const notRecordingText = "not recording";

let addFrame = () => {
  encoder.add(canvas().getContext("2d"));
}

let renderVideo = () => {
  const output = encoder.compile();
  let URL = (window.webkitURL || window.URL);
  const url = URL.createObjectURL(output);
  video().src = url;
  resetEncoder();
}

let timer = 0;

let toogleAudioPlayback = () => {
  if (audio().paused) {
    audio().play();
  } else {
    audio().pause();
  }
  return audio().paused;
}

let restartRecording = () => {
  resetEncoder();
  timer = setInterval(addFrame, SECOND / VIDEO_FRAMES_PER_SECOND * SECOND_TO_MILLIS);
  recordingIndicator().classList.add("active");
  recordingIndicator().innerText = isRecordingText;
}

let finishRecording = () => {
  clearInterval(timer);
  renderVideo();
  recordingIndicator().classList.remove("active");
  recordingIndicator().innerText = notRecordingText;
};

let conversionStepHandler = () => {
  const wasPaused = toogleAudioPlayback();
  if (wasPaused) {
    finishRecording();
  } else {
    restartRecording();
  }
}

let conversionFullHandler = () => {
  if (!audio().paused) {
    audio().pause();
  }
  audio().currentTime = 0;
  conversionStepHandler();
}

let audioEndedHandler = () => {
  console.log("Audio ended!");
  finishRecording();
};

function drawBackgroundCanvas() {
  const ctx = canvas().getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 400, 90);
}

window.onload = () => {
  document.body.style.backgroundColor = bgColor;
  wave.fromElement("audio", "canvas", options);
  drawBackgroundCanvas();
  document.getElementById("convertStepButton").onclick = conversionStepHandler;
  document.getElementById("convertFullButton").onclick = conversionFullHandler;
  audio().onended = audioEndedHandler;
  recordingIndicator().innerText = notRecordingText;
}

const handleUploadedFile = (file) => {
  audio().src = URL.createObjectURL(file);
}
