import React, { useState } from 'react';
import ReactDOM from 'react-dom';

async function classifyImage(image) {
  // Simulate a delay (replace with actual API call)
  await new Promise(resolve => setTimeout(resolve, 2000));
  return ['Cat', 'Dog', 'Bird']; // Replace with your model API call
}

function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async event => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
      setPredictions([]);
      setIsLoading(true);

      try {
        const result = await classifyImage(selectedImage);
        setPredictions(result);
      } catch (error) {
        console.error('Error classifying image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <h1>Image Classification App</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
      {isLoading && <p>Loading predictions...</p>}
      {predictions.length > 0 && (
        <div>
          <h2>Predictions:</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;