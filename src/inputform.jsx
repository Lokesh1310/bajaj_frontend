import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Try to parse the JSON input to check its validity
      const parsedData = JSON.parse(jsonInput);

      // If JSON is valid, send the data to the backend
      const res = await axios.post("http://localhost:8080/bfhl", parsedData);
      setResponse(res.data);
      setError(null);  // Clear any previous error
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setResponse(null);  // Clear any previous response
    }
  };

  const handleMultiSelectChange = (e) => {
    setSelectedOptions([...e.target.selectedOptions].map(option => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredData = {};
    if (selectedOptions.includes("Numbers")) filteredData.numbers = response.numbers;
    if (selectedOptions.includes("Alphabets")) filteredData.alphabets = response.alphabets;
    if (selectedOptions.includes("Highest lowercase alphabet")) filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

    return (
      <pre>{JSON.stringify(filteredData, null, 2)}</pre>
    );
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonInputChange}
          placeholder="Enter JSON data"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>Select Options:</label>
        <select multiple onChange={handleMultiSelectChange}>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </div>

      {renderResponse()}
    </div>
  );
};

export default App;

