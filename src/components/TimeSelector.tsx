import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const TimeSelector: React.FC = () => {
  const navigate = useNavigate();
  const { coinId } = useParams<{ coinId: string }>();
  const [searchParams] = useSearchParams();
  const currentMinutes = searchParams.get('minutes') || '60';

  const updateMinutes = (minutes: string) => {
    navigate(`/coins/${coinId}?minutes=${minutes}`);
  };

  return (
    <div className="flex gap-2 mb-4 items-center justify-end">
      <button
        className={`bg-purple-400 text-xs text-white px-4 py-1 rounded-sm focus:outline-none ${
          currentMinutes === '60' ? 'bg-purple-700' : ''
        }`}
        onClick={() => updateMinutes('60')}
      >
        Past Hour
      </button>
      <button
        className={`bg-purple-400 text-xs text-white px-4 py-1 rounded-sm focus:outline-none ${
          currentMinutes === '1440' ? 'bg-purple-700' : ''
        }`}
        onClick={() => updateMinutes('1440')}
      >
        Past 24 Hours
      </button>
      <button
        className={`bg-purple-400 text-xs text-white px-4 py-1 rounded-sm focus:outline-none ${
          currentMinutes === '4320' ? 'bg-purple-700' : ''
        }`}
        onClick={() => updateMinutes('4320')}
      >
        Past 3 Days
      </button>
      <button
        className={`bg-purple-400 text-xs text-white px-4 py-1 rounded-sm focus:outline-none ${
          currentMinutes === '43200' ? 'bg-purple-700' : ''
        }`}
        onClick={() => updateMinutes('43200')}
      >
        Past 30 Days
      </button>
    </div>
  );
};

export default TimeSelector;