import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// FIX: Add JSX namespace augmentations for @react-three/fiber and ion-icon
// to fix "Property does not exist on type JSX.IntrinsicElements" errors.
// These declarations are placed in the application entrypoint (index.tsx)
// to ensure they are applied globally.
import '@react-three/fiber';



const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
