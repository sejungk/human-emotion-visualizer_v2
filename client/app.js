import React, {useState, useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';
import * as p5 from 'p5';
import {loadModels} from './models.js';
import emotionImages from './emotionImages';
import LoadingPage from "./loader";

let video = document.getElementById('video');
const image = document.getElementById('emotion-image');
let currentEmotion = 'neutral';
let emotionConfidence = 0;
let imagePixelDiv;
let videoElem;
let videoPromise;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const imagePixelDivRef = useRef(null);

  const setup = p5 => {
    p5.noCanvas();
    video = p5.createCapture({ video: true, audio: false });
    videoElem = video.elt;
    video.size(30, 30);
    video.hide();
    imagePixelDiv = p5.createDiv();
    imagePixelDiv.addClass('image-grid');
    imagePixelDiv.attribute('ref', 'imagePixelDiv'); // Add this line to attach the ref to the div element

   // Create the promise and resolve it when the video element is ready
   videoPromise = new Promise((resolve, reject) => {
    video.elt.onloadeddata = () => {
      resolve();
    };
  });
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(start)

  async function start() {
    await videoPromise;
    startVideo();
  }

  const draw = p5 => {
    video.loadPixels();
    let imageGrid = "";
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (i + j * video.width) * 4;
        const r = video.pixels[pixelIndex + 0];
        const g = video.pixels[pixelIndex + 1];
        const b = video.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        const len = emotionImages[currentEmotion].length;
        const charIndex = Math.floor(p5.map(avg, 0, 255, 0, len));
        const image = emotionImages[currentEmotion][charIndex];
        imageGrid += `<img src="${image}">`;
      }
      imageGrid += '<br/>';
    }
    imagePixelDiv.html(imageGrid);
}

async function startVideo() {
  await videoPromise;
  navigator.getUserMedia({
    video: { width: 320, height: 240 }
  },
  (stream) => {
    videoElem = document.getElementsByTagName('video')[0];
    videoElem.srcObject = stream;
    videoElem.onloadedmetadata = (e) => {
      videoElem.play();
    };

      videoElem.addEventListener('loadedmetadata', () => {
        const canvas = faceapi.createCanvasFromMedia(videoElem);
        document.body.append(canvas);
        const displaySize = { width: videoElem.width, height: videoElem.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoElem, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          // get the highest scored expression
          const expression = resizedDetections[0]?.expressions;

          for (const [expressionName, expressionValue] of Object.entries(expression)) {
            if (expressionValue > emotionConfidence) {
              currentEmotion = expressionName;
              emotionConfidence = expressionValue;
            }
          }
          console.log(currentEmotion, emotionConfidence);
        }, 500)
      });
    },
    (err) => {
      console.error(`The following error occurred: ${err.name}`);
    }
  );
}

  useEffect(() => {
      new p5(p => {
        setup(p)
        p.draw = () => draw(p)
      })
    }, [isLoading]);

  return  (
    <>
     {isLoading ? <LoadingPage /> : <div></div>}
    </>
  )
}

export default App
