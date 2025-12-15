import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';

function QRCodeDisplay({ url }) {
    const [qrDataUrl, setQrDataUrl] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (url) {
            QRCode.toDataURL(url, {
                width: 280,
                margin: 2,
                color: {
                    dark: '#1e1b4b',  // Indigo-950
                    light: '#ffffff',
                },
            })
                .then(setQrDataUrl)
                .catch(console.error);
        }
    }, [url]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadQR = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = 'photo-qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!qrDataUrl) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl shadow-xl mb-6">
                <img src={qrDataUrl} alt="QR Code" className="w-64 h-64" />
            </div>

            {/* Scan instruction */}
            <p className="text-purple-200/80 text-center mb-6">
                Scan this QR code to view and share your photo
            </p>

            {/* Actions */}
            <div className="flex gap-3 w-full max-w-xs">
                <button
                    onClick={handleCopyLink}
                    className="flex-1 py-3 px-4 bg-purple-800/60 hover:bg-purple-700/70 text-white rounded-xl font-medium flex items-center justify-center gap-2 border border-purple-500/30 transition-all"
                >
                    {copied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Link
                        </>
                    )}
                </button>

                <button
                    onClick={handleDownloadQR}
                    className="flex-1 py-3 px-4 bg-purple-800/60 hover:bg-purple-700/70 text-white rounded-xl font-medium flex items-center justify-center gap-2 border border-purple-500/30 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Save QR
                </button>
            </div>
        </div>
    );
}

QRCodeDisplay.propTypes = {
    url: PropTypes.string.isRequired,
};

export default QRCodeDisplay;
