import UploadDocument from './Pages/UploadDoc';
import ShowUploadedFile from './Pages/ShowUploadedFile';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">File Upload Application to AWS S3</h1>
        <UploadDocument />
        <hr className="my-6" />
        <h4 className="text-xl font-semibold text-center mb-4">Uploaded Files</h4>
        <ShowUploadedFile />
      </div>
    </div>
  );
}

export default App;
