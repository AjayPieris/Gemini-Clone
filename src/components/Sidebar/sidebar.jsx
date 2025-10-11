import React, { useState } from 'react';
import './sidebar.css';
import assets from '../../assets/assets';

function Sidebar() {
  const [extended, setExtended] = useState(false);

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <img
          onClick={() => setExtended(prev => !prev)}
          className='menu'
          src={assets.menu_icon}
          alt='Menu'
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt='Plus' />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className='recent-title'>Recents</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt='Message' />
              <p>What is React ...</p>
            </div>
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className="bottom-item">
          <img src={assets.question_icon} alt='Help' />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.history_icon} alt='Activity' />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt='Settings' />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
