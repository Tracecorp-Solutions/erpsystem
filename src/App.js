import React from 'react';
import { BrowserRouter as Routers } from 'react-router-dom';
import './App.css';
import Main from './components/Header';


function App() {

  return (
    <div className="min-h-full">
      <div className="py-">
        <Routers>
       
         <Main />
         
        </Routers>
      </div>
    </div>
  );
}

export default App;
