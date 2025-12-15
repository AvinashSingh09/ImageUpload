import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

function CameraCapture({ onCapture }) {
    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Track fullscreen state changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                !!document.fullscreenElement ||
                !!document.webkitFullscreenElement
            );
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onCapture(file);
        }
    };

    const triggerCamera = () => {
        cameraInputRef.current?.click();
    };

    const triggerGallery = () => {
        galleryInputRef.current?.click();
    };

    const toggleFullscreen = async () => {
        try {
            if (!isFullscreen) {
                // Enter fullscreen
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    // iOS Safari
                    await elem.webkitRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    // iOS Safari
                    await document.webkitExitFullscreen();
                }
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-purple-900/60 rounded-2xl backdrop-blur-sm border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Capture Photo</h2>
            <p className="text-purple-200/70 mb-8 text-center">
                Take a photo to upload and share instantly via QR code.
            </p>

            {/* Hidden File Input for Camera */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={cameraInputRef}
                onChange={handleFileChange}
            />

            {/* Hidden File Input for Gallery (no capture attribute) */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={galleryInputRef}
                onChange={handleFileChange}
            />

            <button
                onClick={triggerCamera}
                className="w-full mb-4 py-4 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Take Photo
            </button>

            <button
                onClick={triggerGallery}
                className="w-full py-4 px-6 bg-purple-800/50 hover:bg-purple-700/60 text-white rounded-xl font-medium flex items-center justify-center gap-2 border border-purple-500/30"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload from Gallery
            </button>

            {/* Fullscreen Toggle Button */}
            <button
                onClick={toggleFullscreen}
                className="mt-6 py-3 px-5 bg-indigo-800/50 hover:bg-indigo-700/60 text-white rounded-xl font-medium flex items-center justify-center gap-2 border border-indigo-500/30 transition-all"
            >
                {isFullscreen ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Exit Fullscreen
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        Enter Fullscreen
                    </>
                )}
            </button>
        </div>
    );
}

CameraCapture.propTypes = {
    onCapture: PropTypes.func.isRequired,
};

export default CameraCapture;


