import React, { useState } from "react";
import axios from "axios";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to send file to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/uploadDocument", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to upload document");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Select File (JPG, PNG, PDF)
            </label>
            <input
              type="file"
              id="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
          </div>
          {loading ? (
            <div className="text-center">
              <span className="text-blue-500 font-semibold">Uploading...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Upload
            </button>
          )}
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded text-white ${message.includes("Failed") ? "bg-red-500" : "bg-green-500"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocument;
