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
        //for making typing effect
        setTimeout(function(){
            setResultData((prevResult) => prevResult + nextword); // Append the new word to the existing result
        },75*index);
    }
    
    const onSent = async (prompt) => {
        setResultData ("")
        setLoading(true);
        setshowResult(true);
        setRecentPrompt(input);
        //now lets save our previous prompt in state variable
        setPrevPrompts((prevPrompts) => [...prevPrompts, input]);
        const response=await runChat(input);
        let responseArr=response.split("**"); // this is to convert the text into bold 
        let newResponse="";
      
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