import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Use your actual API key here or load it from environment variables
const API_KEY = "AIzaSyAR_fHhhizDURIpaICLFQIZPb4ZnTXdBho"; // Replace with your actual API key

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the model name
const MODEL_NAME = "gemini-2.5-pro-exp-03-25";

// Define generation configuration
const generationConfig = {
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

// Export the runChat function
export default runChat;