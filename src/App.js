// App.js or a similar file
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login'; // Adjust the path as needed

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Login />
    </div>
  );
}

export default App;
