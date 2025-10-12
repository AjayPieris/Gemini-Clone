import React from 'react';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/sidebar'; 
import './index.css';

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
