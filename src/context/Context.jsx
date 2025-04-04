import { createContext, useState ,useRef} from "react";
import {runChat,generateFromImage} from "../config/gemini"; // Ensure this is the correct path
import React from "react";




export const Context = createContext();

const ContextProvider=(props)=>{
    const[input,setInput]=React.useState("");
    const[recentPrompt,setRecentPrompt]=React.useState("");
    const[prevPrompts,setPrevPrompts]=React.useState([]); //for hidding the card or prev entry
    const[showResult,setshowResult]=React.useState(false);
    const[loading,setLoading]=React.useState(false); 
    const[resultData,setResultData]=React.useState("");
    

 //for speech recognition
 //transcript app jo bologe y eh vahi dedega
 
  
    const delayPara=(index,nextword)=>{
        //for making typing effect
        setTimeout(function(){
            setResultData((prevResult) => prevResult + nextword); // Append the new word to the existing result
        },75*index);
    }

    const newChat=()=>{
        setLoading(false);
        setshowResult(false);
    }
    
    //making eneter functionality
    const handleKeyDown=(event)=>{
        if(event.key==="Enter"){
            event.preventDefault();
            onSent();
        }
    }

    //card click
    const handleCardClick = (query) => {
        setInput(query); // Optional: Show selected text in input field
        setPrevPrompts((prevPrompts) => [...prevPrompts, query]); // Add to history
        onSent(query); // Trigger search with card text
    };

    
  
  
    const handleFileUpload = async (file) => {
        setResultData("");
        setLoading(true);
        setshowResult(true);
        setRecentPrompt("Uploaded Image");
    
        try {
          const text = await generateFromImage(file);
    

          // Extract a short title from the image result
        const summary = text.split(/[.?!]/)[0].split(" ").slice(0, 6).join(" "); // First 6 words of first sentence
        setRecentPrompt(summary); // Set as result title
        setPrevPrompts((prev) => [...prev, summary]);
          let formatted = text
            .split("**")
            .map((chunk, i) => (i % 2 === 1 ? `<b>${chunk}</b>` : chunk))
            .join("")
            .split("*")
            .join("<br>");
    
          const words = formatted.split(" ");
          words.forEach((word, index) => delayPara(index, word + " "));
        } catch (error) {
          console.error("Error processing image:", error);
          setResultData("Error processing the image.");
        } finally {
          setLoading(false);
        }
      };
    

    
    
    
    

    const onSent = async (prompt) => {
        setResultData ("")
        setLoading(true);
        setshowResult(true);

        //for displaying prompt upon clicking in the recent entry
        let response;
        if(prompt!==undefined){
            response=await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts((prevPrompts) => [...prevPrompts, input]);
            setRecentPrompt(input);
            response=await runChat(input);

        }

        // setRecentPrompt(input);
        // //now lets save our previous prompt in state variable
        // setPrevPrompts((prevPrompts) => [...prevPrompts, input]);
        // const response=await runChat(input);
        let responseArr=response.split("**"); // this is to convert the text into bold 
        let newResponse="   ";
      
        for(let i=0;i<responseArr.length;i++){
        if(i===0 || i%2!=1){
            newResponse+=responseArr[i];
    }  
        else{
            newResponse+="<b>"+responseArr[i]+"</b>";
        }      }


        let newResponse2=newResponse.split("*").join("<br>"); //so that line can be shifted in next line
        // setResultData(newResponse2);

        let newResponseArray=newResponse2.split(" "); //so that line can be shifted in next line
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        
        setLoading(false);
        setInput("");
    };
    
    // onSent("What is React?");
    
    const contextValue = {
        // Add any values you want to provide to the context
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setshowResult,
        loading,
        resultData,
        setResultData,
        input,
        setInput,
        newChat,
        handleKeyDown,
        handleCardClick,
        handleFileUpload,

      
        
    
    };
    
    
    
    
    
        return (
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        );
}


export default ContextProvider;