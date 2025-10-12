import React, { useContext, useState } from 'react';
import './sidebar.css';
import assets from '../../assets/assets';
import { Context } from '../../context/Context';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, recentPrompt , newChat} = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="Plus" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recents</p>
            {prevPrompts.length === 0 ? (
              <p className="no-recents">No chats yet</p>
            ) : (
              prevPrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className={`recent-entry ${item === recentPrompt ? 'active' : ''}`}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
