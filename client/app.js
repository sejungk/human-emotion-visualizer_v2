import React, {useEffect, useRef} from 'react';
import * as faceapi from 'face-api.js';
import * as p5 from 'p5';
import {loadModels} from './models.js';
import emotionImages from './emotionImages'

const App = () => {
  let video = useRef(null);
  let pixelDiv;
  const VIDEO = p5.VIDEO;
  let currentEmotion = 'neutral';
  let emotionConfidence = 0;
  let videoElem;
  let videoPromise;
  let emotionImagePool = [];
  let emotionImageIndex = 0;

  const setup = p5 => {
    p5.noCanvas();
    video = p5.createCapture({ video: true, audio: false });
    videoElem = video.elt;
    video.size(30, 30);
    video.hide();
    pixelDiv = p5.createDiv();

    // Create the promise and resolve it when the video element is ready
    videoPromise = new Promise((resolve, reject) => {
      video.elt.onloadeddata = () => {
        resolve();
      };
      video.elt.addEventListener('loadedmetadata', () => {
        startVideo();
      });
    });

    // Create a pool of image elements
    for (let i = 0; i < 100; i++) {
      const img = document.createElement('img');
      img.style.display = 'none';
      pixelDiv.elt.appendChild(img);
      emotionImagePool.push(img);
    }
  };

  const updateEmotion = expression => {
    let highestEmotion = 'neutral';
    let highestConfidence = 0;
    for (const [expressionName, expressionValue] of Object.entries(expression)) {
      if (expressionValue > highestConfidence) {
        highestEmotion = expressionName;
        highestConfidence = expressionValue;
      }
    }
    currentEmotion = highestEmotion;
    emotionConfidence = highestConfidence;
    console.log(currentEmotion);
  };

  const draw = p5 => {
    video.loadPixels();
    const len = emotionImages[currentEmotion].length;
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        const pixelIndex = (i + j * video.width) * 4;
        const r = video.pixels[pixelIndex + 0];
        const g = video.pixels[pixelIndex + 1];
        const b = video.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        const charIndex = Math.floor(p5.map(avg, 0, 255, 0, len));
        let imgElem = emotionImagePool[emotionImageIndex];
        if (!imgElem) {
          imgElem = new Image();
          emotionImagePool[emotionImageIndex] = imgElem;
        }
        const img = imgElem.src || emotionImages[currentEmotion][charIndex];
        imgElem.src = img;
        imgElem.style.display = '';
        emotionImageIndex++;
        pixelDiv.child(imgElem);
      }
      emotionImageIndex++;
      const lineBreak = document.createElement('br');
      pixelDiv.child(lineBreak);
    }
    // Hide any remaining image elements in the pool
    for (let i = emotionImageIndex; i < emotionImagePool.length; i++) {
      emotionImagePool[i].style.display = 'none';
    }
  };

  async function startVideo() {
    videoElem = document.getElementsByTagName('video')[0];
    const canvas = faceapi.createCanvasFromMedia(videoElem);
    document.body.append(canvas);
    const displaySize = { width: videoElem.width, height: videoElem.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoElem, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // get the highest scored expression
      if (resizedDetections.length > 0) {
        const expression = resizedDetections[0].expressions;
        updateEmotion(expression);
      }
    }, 100);
  }

  useEffect(() => {
    loadModels().then(() => {
      new p5(p => {
        setup(p)
        p.draw = () => draw(p)
      })
    })
  }, [])
  return <div/>
}

export default App



// const App = () => {
//   let video = useRef(null);
//   let pixelDiv;
//   const VIDEO = p5.VIDEO;
//   let currentEmotion = 'neutral';
//   let emotionConfidence = 0;
//   let videoElem;
//   let videoPromise;
//   let emotionImagePool = [];
//   let emotionImageIndex = 0;

//   const setup = p5 => {
//     p5.noCanvas();
//     video = p5.createCapture({ video: true, audio: false });
//     videoElem = video.elt;
//     video.size(30, 30);
//     video.hide();
//     pixelDiv = p5.createDiv();

//     // Create the promise and resolve it when the video element is ready
//     videoPromise = new Promise((resolve, reject) => {
//       video.elt.onloadeddata = () => {
//         resolve();
//       };
//       video.elt.addEventListener('loadedmetadata', () => {
//         startVideo();
//       });
//     });

//     // Create a pool of image elements
//     for (let i = 0; i < 100; i++) {
//       const img = document.createElement('img');
//       img.style.display = 'none';
//       pixelDiv.elt.appendChild(img);
//       emotionImagePool.push(img);
//     }
//   };

//   const updateEmotion = expression => {
//     let highestEmotion = 'neutral';
//     let highestConfidence = 0;
//     for (const [expressionName, expressionValue] of Object.entries(expression)) {
//       if (expressionValue > highestConfidence) {
//         highestEmotion = expressionName;
//         highestConfidence = expressionValue;
//       }
//     }
//     currentEmotion = highestEmotion;
//     emotionConfidence = highestConfidence;
//     console.log(currentEmotion);
//   };

//   const draw = p5 => {
//     video.loadPixels();
//     const len = emotionImages[currentEmotion].length;
//     for (let j = 0; j < video.height; j++) {
//       for (let i = 0; i < video.width; i++) {
//         const pixelIndex = (i + j * video.width) * 4;
//         const r = video.pixels[pixelIndex + 0];
//         const g = video.pixels[pixelIndex + 1];
//         const b = video.pixels[pixelIndex + 2];
//         const avg = (r + g + b) / 3;
//         const charIndex = Math.floor(p5.map(avg, 0, 255, 0, len));
//         let imgElem = emotionImagePool[emotionImageIndex];
//         if (!imgElem) {
//           imgElem = new Image();
//           emotionImagePool[emotionImageIndex] = imgElem;
//         }
//         const img = imgElem.src || emotionImages[currentEmotion][charIndex];
//         imgElem.src = img;
//         imgElem.style.display = '';
//         emotionImageIndex++;
//         pixelDiv.child(imgElem);
//       }
//       emotionImageIndex++;
//       const lineBreak = document.createElement('br');
//       pixelDiv.child(lineBreak);
//     }
//     // Hide any remaining image elements in the pool
//     for (let i = emotionImageIndex; i < emotionImagePool.length; i++) {
//       emotionImagePool[i].style.display = 'none';
//     }
//   };

//   async function startVideo() {
//     videoElem = document.getElementsByTagName('video')[0];
//     const canvas = faceapi.createCanvasFromMedia(videoElem);
//     document.body.append(canvas);
//     const displaySize = { width: videoElem.width, height: videoElem.height };
//     faceapi.matchDimensions(canvas, displaySize);

//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(videoElem, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);

//       // get the highest scored expression
//       if (resizedDetections.length > 0) {
//         const expression = resizedDetections[0].expressions;
//         updateEmotion(expression);
//       }
//     }, 100);
//   }

//   useEffect(() => {
//     loadModels().then(() => {
//       new p5(p => {
//         setup(p)
//         p.draw = () => draw(p)
//       })
//     })
//   }, [])
//   return <div/>
// }

// export default App
