import React, { useContext,useRef, useState ,useEffect} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context' // Ensure this is the correct path to your context file
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Main = () => {

  const [imageUploaded, setImageUploaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // holds file
const [imagePreview, setImagePreview] = useState(null);   // holds base64
const [imageReady, setImageReady] = useState(false);      // controls delay



  const { input, setInput,onSent, handleSubmit, loading, showResult, resultData,recentPrompt,handleKeyDown,
    handleCardClick,handleFileUpload
   
    
   } = useContext(Context);
   const fileInputRef = useRef(null);


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

  const handleSend = () => {
    if (input.trim()) {
      onSent(input);
      setInput('');
      SpeechRecognition.stopListening();
    }
  };
  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }


  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
  
      // Add 2 seconds delay to simulate loading
      setImageReady(false);
      setTimeout(() => {
        setImageReady(true);
      }, 2000);
    }
  };
  

  const handleSendImage = () => {
    setImageUploaded(false); // reset after displaying
  };


  return (
    
    <div className='main'>
      <div className='navbar'>
        <p>DuoAi</p>
        <img src={assets.user_icon} alt='user icon' />
      </div>
      <div className="main-container">

        {
          !showResult ?<>
          
        <div className="greet">
            <p><span>Hello,Sanvi</span></p>
            <p>DuoAi is here for you! What’s on your mind?</p>
            </div>
        <div className="cards">
            <div className="card" onClick={
              ()=>handleCardClick("Explore AI-Powered Insights")
            }>
                <p>Explore AI-Powered Insights</p>
                <img src={assets.compass_icon} alt='compass icon' />
            </div>
            <div className="card" onClick={
              ()=>handleCardClick("Summarize Conversations Instantly")
            }>
                <p>Summarize Conversations Instantly</p>
                <img src={assets.bulb_icon} alt='compass icon' />
            </div>
            <div className="card"  onClick={
              ()=>handleCardClick("Create Engaging Team Activities")
            }>
                <p>Create Engaging Team Activities</p>
                <img src={assets.message_icon} alt='compass icon' />
            </div>
            <div className="card" onClick={
              ()=>handleCardClick("Improve Your Writing Clarity")
            } >
                <p>Improve Your Writing Clarity</p>
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
        {imagePreview && (
  <div className="image-preview-container">
    <img src={imagePreview} alt="Selected" className="preview-image" />
    {!imageReady && (
      <div className="uploading-spinner">
        <div className="spinner"></div>
        <p>Uploading...</p>
      </div>
    )}
  </div>
)}

<input onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown}  value={input} type="text" placeholder='Ask DuoAi anything...' />
{/* <p className='transcript'>{transcript}</p> */}
          
          {/* Image Upload */}
          <img
              src={assets.gallery_icon}
              alt="Gallery Icon"
              onClick={handleGalleryClick}
              style={{ cursor: 'pointer' }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />

        {/* Mic */}
        <img 
              src={assets.mic_icon} 
              alt="Mic Icon" 
              onClick={handleMicClick} 
              style={{ backgroundColor: listening ? "#ffcccc" : "transparent", borderRadius: "50%" }} 
            />
                {/* //making send icon display only when text is there in the input box */}
                {(input.trim() || selectedImage) && (
  <img
    onClick={() => {
      if (selectedImage) {
        handleFileUpload(selectedImage); 
        setSelectedImage(null);         
        setImageReady(false);
      } else if (input.trim()) {
        onSent();                        
        SpeechRecognition.stopListening();
        setInput("");                    // Clear input after sending
      }
    }}
    src={assets.send_icon}
    alt="Send"
    style={{ cursor: 'pointer' }} // Optional: Add cursor style for better UX
  />
)}


</div>
 {/* <p className='bottom-info'> Gemini may display inaccurate info,so double-check the responses </p> */}

        </div>

       
      </div>
    </div>
  )
}

export default Main
