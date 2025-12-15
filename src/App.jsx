import { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ResultPage from './components/ResultPage';

function App() {
  const [step, setStep] = useState(1); // 1 = capture, 2 = result
  const [capturedFile, setCapturedFile] = useState(null);

  // Step 1: Camera Capture
  const handleCapture = (file) => {
    setCapturedFile(file);
    setStep(2);
  };

  // Restart flow
  const handleRestart = () => {
    setStep(1);
    setCapturedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 flex flex-col items-center py-8 px-4 font-sans">

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 mb-2">
          Photo Share
        </h1>
        <p className="text-purple-200/70">Capture, upload & share with a QR code</p>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-grow flex flex-col items-center justify-center">

        {step === 1 && (
          <CameraCapture onCapture={handleCapture} />
        )}

        {step === 2 && capturedFile && (
          <div className="w-full animate-in fade-in zoom-in duration-300">
            <ResultPage
              imageFile={capturedFile}
              onRestart={handleRestart}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Photo Share App
      </footer>

    </div>
  );
}

export default App;
