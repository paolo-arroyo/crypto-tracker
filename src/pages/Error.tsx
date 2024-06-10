import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const history = useNavigate();

  const handleBackClick = () => {
    history(-2);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold my-6">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8"> Please try again in a minute. </p>
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