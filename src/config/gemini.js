import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Use your actual API key here or load it from environment variables
const API_KEY = "AIzaSyDZgi9KZjqkfsus_lKSNE3Wcc8a6G3oH5I"; // Replace with your actual API key

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the model name
const TEXT_MODEL_NAME = "gemini-2.5-pro-exp-03-25";
const IMAGE_MODEL_NAME = "gemini-2.0-flash-exp-image-generation";

// Define generation configuration for text
const textGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "text/plain",
};

// Define safety settings
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

// Function to run the chat
async function runChat(prompt) {
    // Start a chat session with the specified model
    const chatSession = genAI.getGenerativeModel({
        model: MODEL_NAME,
    }).startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    // Send the prompt to the chat session
    const result = await chatSession.sendMessage(prompt);

    // Handle the response
    const response = result.response;
    console.log(response.text());
    return response.text(); // Return the response text 
}


// HELPER: Convert File to Base64
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.replace(/^data:.+;base64,/, "");
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  // ✨ IMAGE-BASED PROMPT FUNCTION
  async function generateFromImage(file, promptText = "Describe this image in detail.") {
    try {
      const base64Image = await convertToBase64(file);
  
      const model = genAI.getGenerativeModel({ model: IMAGE_MODEL_NAME });
  
      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: file.type,
            data: base64Image,
          },
        },
        {
          text: promptText,
        },
      ]);
  
      return result.response.text();
    } catch (error) {
      console.error("Error generating from image:", error);
      return "Failed to analyze the image.";
    }
  }
  
  export { runChat, generateFromImage };