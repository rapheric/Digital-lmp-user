
import { Link } from 'react-router-dom';

const Forbidden: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">403</h1>
        <p className="text-xl text-gray-600 mt-4">Forbidden Access</p>
        <p className="text-md text-gray-500 mt-2">You don’t have permission to access this page.</p>
        <Link to="/" className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg
         hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
