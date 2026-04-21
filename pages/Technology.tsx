import React from 'react';

const TechnologyPage = () => {
  const features = [
    { name: 'Flight Controller (FC)', description: 'The brain of the drone, processing inputs and controlling flight.' },
    { name: 'Battery Module', description: 'High-capacity power source for extended flight times.' },
    { name: 'GPS Module', description: 'Provides precise positioning for navigation and return-to-home functions.' },
    { name: 'Propulsion System', description: 'High-efficiency motors and propellers for powerful and quiet flight.' },
    { name: 'Gimbal and Camera', description: 'Stabilized 4K camera for capturing stunning aerial footage.' },
    { name: 'Obstacle Avoidance Sensors', description: 'Multi-directional sensors to prevent collisions.' },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold">SKYVISION PRO</h1>
          <p className="mt-4 text-xl">Revolutionizing the Skies with Precision and Power.</p>
          <div className="mt-8 space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Explore Features
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="sticky top-24 h-[calc(100vh-6rem)] hidden md:block rounded-xl overflow-hidden shadow-2xl">
           <img src="https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1770&auto=format&fit=crop" alt="SkyVision Pro Technology" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-12 py-12 md:py-32">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-lg hover:border-blue-500 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-blue-400">{feature.name}</h3>
              <p className="mt-4 text-gray-300 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
