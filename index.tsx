import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// FIX: Add JSX namespace augmentations for @react-three/fiber and ion-icon
// to fix "Property does not exist on type JSX.IntrinsicElements" errors.
// These declarations are placed in the application entrypoint (index.tsx)
// to ensure they are applied globally.
import '@react-three/fiber';

declare global {
  namespace JSX {
    // FIX: Use declaration merging to augment IntrinsicElements for the custom 'ion-icon' element.
    // The previous use of `extends React.JSX.IntrinsicElements` was replacing the global
    // definitions for standard HTML elements and elements from libraries like @react-three/fiber.
    // This approach correctly adds the new element without removing existing ones.
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string;
      };
    }
  }
}

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
