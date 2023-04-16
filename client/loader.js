import React, { useState, useEffect, useRef } from 'react';

const LoadingPage = () => {
  const [dots, setDots] = useState(Array(7).fill(false)); // Array of boolean values to track dot states
  const [animationDone, setAnimationDone] = useState(false); // State variable to track if animation is done

  useEffect(() => {
    let counter = 0; // Counter to keep track of seconds

    // Timer to update dot states
    const timer = setInterval(() => {
      setDots(prevDots => {
        // Update the state of the current dot to true (filled) and increment the counter
        const newDots = [...prevDots];
        if (counter <= 7) {
          newDots[counter] = true;
          counter += 1;
        }

        // If all dots are filled, clear the interval and set animationDone to true
        if (counter === 8) {
          clearInterval(timer);
          setAnimationDone(true);

        }
        return newDots;
      });
    }, 1000); // 1 second in milliseconds

    // Clean up the timer on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Conditionally render the loading page based on animationDone state
  return (
    !animationDone ? (
      <div className="loading-page">
        <div className="loading-container_text">
          <h1>Human Emotion v2</h1>
          <p>face scanning in progress...</p>
        </div>
        <div className="loading-dots_container">
          {dots.map((isFilled, index) => (
            <div
              key={index}
              className={`loading-dot ${isFilled ? 'loading-dot-fill' : ''}`}
            />
          ))}
        </div>
      </div>
    ) : null
  );
};

export default LoadingPage;





// Prev

// import React, {useState, useEffect} from 'react';

// const LoadingPage = () => {
//   const [dots, setDots] = useState(Array(7).fill(false)); // Array of boolean values to track dot states

//   useEffect(() => {
//     let counter = 0; // Counter to keep track of seconds

//     // Timer to update dot states
//     const timer = setInterval(() => {
//       setDots(prevDots => {
//         // Update the state of the current dot to true (filled) and increment the counter
//         const newDots = [...prevDots];
//         newDots[counter] = true;
//         counter += 1;

//         // If all dots are filled, clear the interval
//         if (counter === 7) {
//           clearInterval(timer);
//         }
//         return newDots;
//       });
//     }, 1000); // 1 second in milliseconds

//     // Clean up the timer on component unmount
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <div className="loading-page">
//       <div className="loading-container_text">
//         <h1>Human Emotion v2</h1>
//         <p>face scanning in progress...</p>
//       </div>
//       <div className="loading-dots_container">
//         {dots.map((isFilled, index) => (
//           <div
//             key={index}
//             className={`loading-dot ${isFilled ? 'loading-dot-fill' : ''}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LoadingPage;
