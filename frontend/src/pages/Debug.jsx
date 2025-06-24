import React from 'react';

const Debug = () => {
  console.log('Debug component is rendering');
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">App Status</h2>
          <div className="space-y-2">
            <p className="text-green-600">✅ React is working</p>
            <p className="text-green-600">✅ Tailwind CSS is working</p>
            <p className="text-green-600">✅ Component is rendering</p>
            <p className="text-blue-600">🔄 Frontend: http://localhost:5174</p>
            <p className="text-blue-600">🔄 Backend: http://localhost:8080</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Tests</h2>
          <div className="space-y-4">
            <button
              onClick={() => alert('Button click works!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Test Button Click
            </button>
            
            <button
              onClick={() => console.log('Console log works!')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors ml-4"
            >
              Test Console Log
            </button>
            
            <button
              onClick={() => window.location.href = '/test'}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors ml-4"
            >
              Go to Test Page
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Environment Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>User Agent:</strong> {navigator.userAgent}</p>
            <p><strong>URL:</strong> {window.location.href}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;
