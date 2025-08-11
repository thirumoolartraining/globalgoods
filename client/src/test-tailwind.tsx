import React from 'react';

// This component uses Tailwind classes directly
const TestTailwind = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Test Component
            </div>
            <a 
              href="#" 
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              Tailwind CSS is working!
            </a>
            <p className="mt-2 text-gray-500">
              If you can see this styled component, Tailwind CSS is working correctly.
            </p>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Test Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;
