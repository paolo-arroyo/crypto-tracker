import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const history = useNavigate();

  const handleBackClick = () => {
    history(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8">Please try again later.</p>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleBackClick}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;