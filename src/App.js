// App.js or a similar file
import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './loginTest.js'; // Adjust the path as needed

function App() {
  return (
    <>
      <ToastContainer 
      transition={Slide}
      autoClose = {1500}
      newestOnTop={true}
      pauseOnHover = {true}
      pauseOnFocusLoss = {false}
      limit={5}
      />
      <Login />
    </>
  );
}

export default App;

