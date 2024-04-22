import React, { useEffect, useState } from 'react';
import { BrowserRouter as Routers } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
import Header from './components/Header';

// import Footer from './components/Footer';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="min-h-full">
      {/* <Navbar /> */}

      <div className="py-">
        <Routers>
         <Header />
        </Routers>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
