import React from 'react';
import { Link } from 'react-router-dom';

export default function ProgressDashboard({ progress }) {
  const calculateCompletion = (modules) => {
    if (!modules?.length) return 0;
    const completed = modules.filter(m => m.completed).length;
    return Math.round((completed / modules.length) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Progress</h2>
        <div className="text-sm text-gray-500">
          Overall Completion: {calculateCompletion(progress?.modules)}%
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {progress?.badges?.map(badge => (
          <div key={badge.id} className="border rounded-lg p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">{badge.emoji}</span>
            </div>
            <h3 className="font-medium">{badge.name}</h3>
            <p className="text-sm text-gray-500">{badge.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Current Modules</h3>
        {progress?.modules?.map(module => (
          <div key={module.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{module.title}</h4>
              <span className="text-sm text-gray-500">
                {module.completed ? 'Completed' : `${module.progress}%`}
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all"
                style={{ width: `${module.progress}%` }}
              />
            </div>
            {module.completed && module.certificateId && (
              <Link 
                to={`/certificates/${module.certificateId}`}
                className="text-sm text-sky-600 hover:underline mt-2 block"
              >
                View Certificate
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}