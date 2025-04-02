import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context' // Ensure this is the correct path to your context file


const Main = () => {

  const { input, setInput,onSent, handleSubmit, loading, showResult, resultData,recentPrompt } = useContext(Context);

  return (
    <div className='main'>
      <div className='navbar'>
        <p>GeminiGo</p>
        <img src={assets.user_icon} alt='user icon' />
      </div>
      <div className="main-container">

        {
          !showResult ?<>
          
        <div className="greet">
            <p><span>Hello,Sanvi</span></p>
            <p>How can I help You Today!</p>
        </div>
        <div className="cards">
            <div className="card">
                <p>Suggest some beautiful places</p>
                <img src={assets.compass_icon} alt='compass icon' />
            </div>
            <div className="card">
                <p>Briefly summarize</p>
                <img src={assets.bulb_icon} alt='compass icon' />
            </div>
            <div className="card">
                <p>Brainstrom team Bonding activities for our work</p>
                <img src={assets.message_icon} alt='compass icon' />
            </div>
            <div className="card">
                <p>Improve the readablity</p>
                <img src={assets.code_icon} alt='compass icon' />
            </div>
        </div>
        </>
        : <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
{/* jab tak load ni hota tab tak it can generate loader div*/}
          <div className="result-data">
          <img src={assets.gemini_icon} alt="Gemini Icon" className="assets gemini_icon" /> 

          {
            loading?<div className="loader">
                <hr />
                <hr />
                <hr />
            </div>:
          <p dangerouslySetInnerHTML={{ __html: resultData }} />

          }  
          </div>
        </div>
        }
        <div className="main-bottom">
         
            <div className="search-box">

            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Type your message here...' />
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img onClick={()=>onSent()}src={assets.send_icon} alt="" />
            </div>
            </div>

        {/* <p className='bottom-info'> Gemini may display inaccurate info,so double-check the responses </p> */}
      </div>
    </div>
  )
}

export default Main
