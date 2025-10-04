// // controller/chatController.js
// import { GoogleGenAI } from '@google/genai';
// import 'dotenv/config';

// // Initialize Gemini 2.5 Flash model
// const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // Store conversation history per session
// const conversationHistory = new Map();

// // Get conversation history
// const getConversationContext = (sessionId) => conversationHistory.get(sessionId) || [];

// // Update conversation history
// const updateConversationContext = (sessionId, message, response) => {
//   const history = getConversationContext(sessionId);
//   history.push({ role: 'user', content: message });
//   history.push({ role: 'assistant', content: response });
//   conversationHistory.set(sessionId, history.slice(-10));
// };

// // Chat controller
// const getChatResponse = async (req, res) => {
//   try {
//     const { message, sessionId = 'default-session' } = req.body;

//     if (!message) {
//       return res.status(400).json({ success: false, message: 'Message is required' });
//     }

//     const history = getConversationContext(sessionId);
//     const context = history.map(msg =>
//       `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
//     ).join('\n');

//     // Prompt (you can also try a simpler version if first test fails)
//     const prompt = `
// You are a knowledgeable health assistant. Answer user questions in detail about any health topic, including women's health, general medicine, nutrition, mental health, fitness, and lifestyle.

// Previous conversation context:
// ${context}

// Current user message:
// ${message}
// `;

//     let aiResponse = "Sorry, I couldn't generate a response.";

//     try {
//       const response = await genAI.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: [{ type: 'text', text: prompt }],
//       });

//       // Log full Gemini response for debugging
//       console.log('Full Gemini response:', JSON.stringify(response, null, 2));

//       aiResponse = response.candidates?.[0]?.content?.[0]?.text || aiResponse;

//     } catch (gemError) {
//       console.error('Gemini API call failed:', gemError);
//     }

//     // Save conversation
//     updateConversationContext(sessionId, message, aiResponse);

//     res.status(200).json({ success: true, data: aiResponse });

//   } catch (error) {
//     console.error('Server Error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//   }
// };

// export { getChatResponse };


// controller/chatController.js
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

// Initialize Gemini 2.5 Flash model
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// In-memory conversation history per session
const conversationHistory = new Map();

// Get conversation history
const getConversationContext = (sessionId) => conversationHistory.get(sessionId) || [];

// Update conversation history (keep last 10 messages)
const updateConversationContext = (sessionId, message, response) => {
  const history = getConversationContext(sessionId);
  history.push({ role: 'user', content: message });
  history.push({ role: 'assistant', content: response });
  conversationHistory.set(sessionId, history.slice(-10));
};

// Chat controller
const getChatResponse = async (req, res) => {
  try {
    const { message, sessionId = 'default-session' } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const history = getConversationContext(sessionId);
    const context = history.map(msg =>
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    // Build prompt
    const prompt = `
You are a knowledgeable health assistant. Answer user questions in detail about any health topic, including women's health, general medicine, nutrition, mental health, fitness, and lifestyle.

Previous conversation context:
${context}

Current user message:
${message}
`;

    let aiResponse = "Sorry, I couldn't generate a response.";

    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ type: 'text', text: prompt }],
      });

      // Log full response for debugging (optional)
      console.log('Gemini full response:', JSON.stringify(response, null, 2));

      // Correctly extract text from parts
      aiResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || aiResponse;

    } catch (gemError) {
      console.error('Gemini API call failed:', gemError);
    }

    // Save conversation in memory
    updateConversationContext(sessionId, message, aiResponse);

    // Return response to client
    res.status(200).json({ success: true, data: aiResponse });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

export { getChatResponse };
