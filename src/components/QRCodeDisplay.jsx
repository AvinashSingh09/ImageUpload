import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';

function QRCodeDisplay({ url }) {
    const [qrDataUrl, setQrDataUrl] = useState(null);

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
            <p className="text-purple-200/80 text-center">
                Scan this QR code to view and share your photo
            </p>
        </div>
    );
}

QRCodeDisplay.propTypes = {
    url: PropTypes.string.isRequired,
};

export default QRCodeDisplay;

