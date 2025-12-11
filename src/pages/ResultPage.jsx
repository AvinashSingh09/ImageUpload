import { useNavigate } from 'react-router-dom'

function ResultPage({ selectedImage, selectedOverlay, userName }) {
    const navigate = useNavigate()

    const handleStartOver = () => {
        navigate('/')
    }

    if (!selectedImage || !selectedOverlay) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
                <p className="text-white text-xl mb-4">No selections made</p>
                <button
                    onClick={handleStartOver}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                    Start Over
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Your Certificate
            </h1>
            <p className="text-gray-400 mb-8 text-lg">Here's your personalized certificate</p>

            {/* Combined result */}
            <div className="relative max-w-2xl w-full bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="relative">
                    {/* Base frame image */}
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.name}
                        className="w-full object-contain rounded-xl"
                    />

                    {/* User's name rendered on the certificate */}
                    <div
                        className="absolute text-gray-700 font-medium pointer-events-none"
                        style={{
                            bottom: '11%',
                            left: '33%',
                            fontSize: 'clamp(10px, 2vw, 18px)',
                            fontFamily: 'Arial, sans-serif'
                        }}
                    >
                        {userName}
                    </div>

                    {/* Overlay image on top */}
                    <img
                        src={selectedOverlay.src}
                        alt={selectedOverlay.name}
                        className="absolute object-contain rounded-xl"
                        style={{
                            width: '50%',
                            height: '60%',
                            bottom: '27%',
                            left: '20%',
                            transform: 'translateX(-50%)'
                        }}
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button
                    onClick={handleStartOver}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
                >
                    Start Over
                </button>
            </div>
        </div>
    )
}

export default ResultPage
