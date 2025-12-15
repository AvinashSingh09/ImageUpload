import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { uploadToCloudinary } from '../services/cloudinary';
import QRCodeDisplay from './QRCodeDisplay';

function ResultPage({ imageFile, onRestart }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
    const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Create preview URL from file
    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imageFile]);

    // Auto-upload on mount
    useEffect(() => {
        if (imageFile && uploadStatus === 'idle') {
            handleUpload();
        }
    }, [imageFile]);

    const handleUpload = async () => {
        if (!imageFile) return;

        setUploadStatus('uploading');
        setErrorMessage('');

        try {
            const url = await uploadToCloudinary(imageFile);
            setCloudinaryUrl(url);
            setUploadStatus('success');
        } catch (error) {
            console.error('Upload failed:', error);
            setErrorMessage(error.message || 'Failed to upload image');
            setUploadStatus('error');
        }
    };

    const handleRetry = () => {
        setUploadStatus('idle');
        handleUpload();
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">

            {/* Image Preview - Compact */}
            <div className="relative w-full bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl mb-6 border border-purple-500/30">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Captured Photo"
                        className="w-full h-auto max-h-64 object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-48">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                )}

                {/* Upload Status Overlay */}
                {uploadStatus === 'uploading' && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
                        <p className="text-white font-medium">Uploading to cloud...</p>
                    </div>
                )}
            </div>

            {/* Upload Status Messages */}
            {uploadStatus === 'error' && (
                <div className="w-full bg-red-500/20 border border-red-500/40 rounded-xl p-4 mb-6">
                    <p className="text-red-300 text-center mb-3">{errorMessage}</p>
                    <button
                        onClick={handleRetry}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                        Retry Upload
                    </button>
                </div>
            )}

            {/* QR Code Section - Shows after successful upload */}
            {uploadStatus === 'success' && cloudinaryUrl && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        📱 Scan to Share
                    </h2>
                    <QRCodeDisplay url={cloudinaryUrl} />
                </div>
            )}

            {/* Start Over Button */}
            <button
                onClick={onRestart}
                className="mt-8 w-full max-w-xs py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Take Another Photo
            </button>
        </div>
    );
}

ResultPage.propTypes = {
    imageFile: PropTypes.object.isRequired,
    onRestart: PropTypes.func.isRequired,
};

export default ResultPage;
