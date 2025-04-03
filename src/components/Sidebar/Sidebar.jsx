import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';



const Sidebar = () => {
const[extended,setExtended] = React.useState(false);
const{onSent,prevPrompts,setRecentPrompt,newChat}=React.useContext(Context);

const loadPrompt=async (prompt)=>{
  setRecentPrompt(prompt);
  await onSent(prompt);
  
}

  return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={()=>setExtended(prev=>!prev)}
         className='menu' src={assets.menu_icon} alt='menu icon' />
        <div onClick={newChat}
         className='new_chat'>
          <img className='plus' src={assets.plus_icon} alt='plus icon' />
          {extended?<p>New Chat</p>:null}
        </div>
        {
            extended
        ?<div className='history'>
          <p className='history_text'>History</p>

          {
  prevPrompts.map((item, index) => {
    return (
      <div   onClick={()=>loadPrompt(item)} // Add onClick handler to load the prompt
       className="history-entry" key={index}> {/* Add a unique key prop here */}
        <img src={assets.message_icon} alt='message icon' />
        <p>{item.slice(0, 20)} ...</p>
      </div>
    );
  })
}
          {/* <div className='history-entry'>
            <img src={assets.message_icon} alt='message icon' />
            <p>What is react ...</p> 
          </div> */}
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