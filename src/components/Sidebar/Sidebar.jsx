import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
const[extended,setExtended] = React.useState(false);


  return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={()=>setExtended(prev=>!prev)}
         className='menu' src={assets.menu_icon} alt='menu icon' />
        <div className='new_chat'>
          <img className='plus' src={assets.plus_icon} alt='plus icon' />
          {extended?<p>New Chat</p>:null}
        </div>
        {
            extended
        ?<div className='history'>
          <p className='history_text'>History</p>
          <div className='history-entry'>
            <img src={assets.message_icon} alt='message icon' />
            <p>What is react ...</p> 
          </div>
        </div>
         
      :null}
      </div>
      <div className='bottom'>
        <div className='bottom-item-recent-entry'>
            <img src={assets.question_icon} alt='question icon' />
           {extended ?<p>Help</p>:null}
        </div>
        <div className='bottom-item-recent-entry'>
            <img src={assets.history_icon} alt='question icon' />
            {extended?<p>Activity</p>:null}
        </div>
        <div className='bottom-item-recent-entry'>
            <img src={assets.setting_icon} alt='question icon' />
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;