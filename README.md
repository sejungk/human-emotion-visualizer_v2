# Human Emotion Visualizer

The Human Emotion Visualizer is a web application that uses face recognition technology to detect the user's emotions and generate corresponding images. It is built with React and utilizes the face-api JavaScript API for face recognition in the browser. The API is built on Tensorflow.js, an end-to-end open source platform for machine learning.

To use the application, simply grant access to your webcam and wait for the emotion detection process to start. You will be able to see real-time feedback on your emotions and generate images that correspond to the detected emotion.

## Installation

To install the application, simply clone the repository and run npm install to install the necessary dependencies.

## Usage

To start the application, run npm start-dev and navigate to localhost:8080 in your browser. Grant access to your webcam when prompted and wait for the emotion detection process to start. Follow the on-screen instructions to generate images that correspond to your emotions.

### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  * You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes. Before submitting a pull request, make sure to run npm run lint-fix to fix any linting errors.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

