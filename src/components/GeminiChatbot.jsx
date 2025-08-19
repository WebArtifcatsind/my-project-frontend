// src/components/GeminiChatbot.jsx
import React, { useState } from 'react';
import './GeminiChatbot.css'; // Import the dedicated CSS file
import { MessageSquare } from 'lucide-react'; // Changed to MessageSquare icon for a familiar chat bubble look

const GeminiChatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control chatbox visibility

  // Predefined questions - Customize these as per your needs
  const predefinedQuestions = [
    "What services do you offer?",
    "How can I contact WebArtifacts?",
    "Tell me about your working process.",
    "What is your mission?",
    "Do you provide cybersecurity consulting?",
  ];

  // Function to toggle the chatbox open/close
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  // Function to send message to the backend
  const sendMessage = async (messageText) => {
    // Prevent sending empty messages
    if (messageText.trim() === '') return;

    setIsLoading(true); // Set loading state to true
    // Add the user's message to the chat history immediately for a responsive UI
    setChatHistory((prev) => [...prev, { type: 'user', message: messageText }]);
    setUserInput(''); // Clear the input field after sending

    try {
      // Make a POST request to your backend API endpoint
      // Ensure this URL matches your backend's actual address and endpoint
      const response = await fetch('https://api.webartifacts.in/api/gemini-chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the user's prompt and a session ID (useful for maintaining conversation context on backend)
        body: JSON.stringify({
          message: messageText,
          sessionId: 'user-session-id-123' // You might want to generate a unique session ID
        }),
      });

      // Check if the network response was successful
      if (!response.ok) {
        // If not successful, throw an error with the HTTP status
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
      // Add the bot's response to the chat history (using 'data.reply' as per your backend's response structure)
      setChatHistory((prev) => [...prev, { type: 'bot', message: data.reply }]);
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error sending message to backend:', error);
      // Display a user-friendly error message in the chat
      setChatHistory((prev) => [...prev, { type: 'bot', message: "I'm sorry, I'm having trouble connecting to the AI right now. Please try again later or contact our team directly." }]);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (which would reload the page)
    sendMessage(userInput); // Call sendMessage with the current user input
  };

  // Handle click on a predefined question button
  const handlePredefinedQuestionClick = (question) => {
    sendMessage(question); // Send the predefined question as a message
  };

  return (
    <div className="gemini-chatbot-wrapper">
      {/* Chatbot Icon - This button toggles the chatbox visibility */}
      <button className="gemini-chatbot-icon" onClick={toggleChatbox}>
        {/* Using the MessageSquare icon for a common chat bubble appearance */}
        <MessageSquare size={32} />
      </button>

      {/* Chatbox Container - conditionally rendered and styled based on 'isOpen' state */}
      <div className={`gemini-chatbot-container ${isOpen ? 'open' : ''}`}>
        <h2 className="gemini-chatbot-title">Gemini Chatbot</h2>
        <div className="gemini-chat-history">
          {/* Map through chatHistory to display each message */}
          {chatHistory.map((msg, index) => (
            <div key={index} className={`gemini-message ${msg.type}`}>
              <strong>{msg.type === 'user' ? 'You:' : 'Gemini:'}</strong> {msg.message}
            </div>
          ))}
          {isLoading && <div className="gemini-loading-text">Gemini is thinking...</div>}

          {/* Display predefined questions if chat history is empty and not currently loading */}
          {chatHistory.length === 0 && !isLoading && (
            <div className="gemini-predefined-questions">
              <p>Try asking:</p>
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="gemini-predefined-button"
                  onClick={() => handlePredefinedQuestionClick(question)}
                  disabled={isLoading} // Disable buttons while a response is loading
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input form for sending messages */}
        <form onSubmit={handleSubmit} className="gemini-input-form">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading} // Disable input while loading
            className="gemini-chat-input"
          />
          <button type="submit" disabled={isLoading} className="gemini-send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiChatbot;
