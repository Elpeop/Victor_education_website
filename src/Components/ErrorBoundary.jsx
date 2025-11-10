// filepath: c:\Users\Louis\OneDrive\Documents\Louis_s documents\Victor_Robot_Education\frontend\src\Components\ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-lg shadow max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600">The application encountered an error. Please try refreshing the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}