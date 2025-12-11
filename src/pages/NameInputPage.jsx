import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NameInputPage({ selectedImage, onSetName }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const handleContinue = () => {
        if (name.trim()) {
            onSetName(name.trim())
            navigate('/overlay')
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    if (!selectedImage) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
                <p className="text-white text-xl mb-4">No image selected</p>
                <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                    Go Back
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center p-8">
            <button
                onClick={handleBack}
                className="self-start mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
            </button>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center">
                Enter Your Name
            </h1>
            <p className="text-gray-400 mb-8 text-lg text-center">This will appear on your certificate</p>

            {/* Preview of selected frame */}
            <div className="mb-8 p-4 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                <img
                    src={selectedImage.src}
                    alt={selectedImage.name}
                    className="h-48 md:h-64 object-contain rounded-lg"
                />
            </div>

            {/* Name input */}
            <div className="w-full max-w-md">
                <label className="block text-gray-400 text-sm mb-2">
                    Name (after Dr.)
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 bg-gray-800/80 border border-gray-600 rounded-xl text-white text-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-gray-500"
                    autoFocus
                />
            </div>

            {/* Continue button */}
            <button
                onClick={handleContinue}
                disabled={!name.trim()}
                className={`mt-8 px-10 py-4 font-semibold rounded-xl transition-all duration-300 ${name.trim()
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 cursor-pointer'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
            >
                Continue
            </button>
        </div>
    )
}

export default NameInputPage
