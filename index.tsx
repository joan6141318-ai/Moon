import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: The import for the App component was pointing to an empty/incorrect file in the root directory. The path has been updated to import the correct component from 'src/App.tsx'.
import App from './src/App';

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