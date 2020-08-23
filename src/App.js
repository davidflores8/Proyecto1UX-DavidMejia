import React from 'react';
import './App.css';

import Links from './componentes/Links'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {



  return (
    <div className="container p-4">
        <Links/>
      <ToastContainer/>
    </div>
  );
}

export default App;
