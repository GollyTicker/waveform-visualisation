# In-Browser Waveform Visualiser

## Local usage

To convert an audio file to it's waveform visualisation, you can simply `./restart-http-server.sh --dev` and then open `http://localhost` in a recent version of [Google Chrome](https://www.google.com/chrome/). Firefox, Safari, etc. will **not** work!

Using `--dev` also activates on Flask's debug mode.

## Deployment on a server

`./restart-http-server.sh`

## Used Packages

* [Wave.js](https://github.com/foobar404/Wave.js/) [modified] is used to generate the waveform for an audio playback into a canvas
* [Whammy](https://github.com/antimatter15/whammy) to convert an animated canvas into a WebM encoded video
