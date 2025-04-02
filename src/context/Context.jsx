import { createContext } from "react";
import runChat from "../config/gemini"; // Ensure this is the correct path
import React from "react";

export const Context = createContext();

const ContextProvider=(props)=>{
    const[input,setInput]=React.useState("");
    const[recentPrompt,setRecentPrompt]=React.useState("");
    const[prevPrompts,setPrevPrompts]=React.useState([]); //for hidding the card or prev entry
    const[showResult,setshowResult]=React.useState(false);
    const[loading,setLoading]=React.useState(false); 
    const[resultData,setResultData]=React.useState("");

    const delayPara=(index,nextword)=>{

    }
    
    const onSent = async (prompt) => {
        setResultData ("")
        setLoading(true);
        setshowResult(true);
        setRecentPrompt(input);
        const response=await runChat(input);
        let responseArr=response.split("**");
        let newResponse;
      
        for(let i=0;i<responseArr.length;i++){
        if(i===0 || i%2!=1){
            newResponse+=responseArr[i];
    }  
        else{
            newResponse+="<b>"+responseArr[i]+"</b>";
        }      }
        setResultData(newResponse);
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
        loading,
        resultData,
        input,
        setInput,
    
    };
    
    
    
    
    
        return (
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        );
}


export default ContextProvider;