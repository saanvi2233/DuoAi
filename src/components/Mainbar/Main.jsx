import React, { useContext,useRef, useState ,useEffect} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context' // Ensure this is the correct path to your context file
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Main = () => {

  
  const { input, setInput,onSent, handleSubmit, loading, showResult, resultData,recentPrompt,handleKeyDown,
    handleCardClick,
   
    
   } = useContext(Context);

    // Speech Recognition Hook
    const { transcript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();


    // Toggle Listening State
  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  // Sync transcript with input field
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
      console.log(transcript);
    }
  }, [transcript, setInput]);

  // Handle sending input
  const handleSend = () => {
    if (input.trim()) {
      onSent(input); // Send the input
      setInput(''); // Clear the input field
      SpeechRecognition.stopListening(); // Stop the mic
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    
    <div className='main'>
      <div className='navbar'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='user icon' />
      </div>
      <div className="main-container">

        {
          !showResult ?<>
          
        <div className="greet">
            <p><span>Hello,Sanvi</span></p>
            <p>How can Gemini help?</p>
        </div>
        <div className="cards">
            <div className="card" onClick={
              ()=>handleCardClick("Discover Stunning Destinations")
            }>
                <p>Discover Stunning Destinations</p>
                <img src={assets.compass_icon} alt='compass icon' />
            </div>
            <div className="card" onClick={
              ()=>handleCardClick("DSummarize Key Points Effortlessly")
            }>
                <p>Summarize Key Points Effortlessly</p>
                <img src={assets.bulb_icon} alt='compass icon' />
            </div>
            <div className="card"  onClick={
              ()=>handleCardClick("Generate Fun Team-Building Ideas")
            }>
                <p>Generate Fun Team-Building Ideas</p>
                <img src={assets.message_icon} alt='compass icon' />
            </div>
            <div className="card" onClick={
              ()=>handleCardClick("Enhance Your Content's Clarit")
            } >
                <p>Enhance Your Content's Clarity</p>
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

<input onChange={(e)=>setInput(e.target.value)}  onKeyDown={handleKeyDown} value={input} type="text" placeholder='Type your message here...' />
{/* <p className='transcript'>{transcript}</p> */}
          
    <img src={assets.gallery_icon} alt="" />
    <img 
              src={assets.mic_icon} 
              alt="Mic Icon" 
              onClick={handleMicClick} 
              style={{ backgroundColor: listening ? "#ffcccc" : "transparent", borderRadius: "50%" }} 
            />    {/* //making send icon display only when text is there in the input box */}
    {input?<img onClick={() => {
      onSent();      // Existing function
      SpeechRecognition.stopListening(); // Stop mic after sending
    }} src={assets.send_icon} alt="" />:null}
</div>
 {/* <p className='bottom-info'> Gemini may display inaccurate info,so double-check the responses </p> */}

        </div>

       
      </div>
    </div>
  )
}

export default Main
