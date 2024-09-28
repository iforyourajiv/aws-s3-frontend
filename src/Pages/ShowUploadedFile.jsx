import React, { useState, useEffect } from "react";

const ShowUploadedFile = () => {
    const [fileUrls, setFileUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch("http://localhost:3001/getAllUploadDocument");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data)
                setFileUrls(data.fileName); // Assuming the response structure has a 'files' field
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {fileUrls.map((file, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="font-bold text-lg">{file.fileName}</h3>
                    <a 
                        href={file.fileUrl} 
                        className="text-blue-500 hover:underline" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        View File
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ShowUploadedFile;
