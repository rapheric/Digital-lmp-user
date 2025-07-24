
import { Link } from 'react-router-dom';

const BadRequest: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">400</h1>
                <p className="text-xl text-gray-600 mt-4">the server couldn’t understand the request.</p>
                <Link to="/" className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg
         hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default BadRequest;
