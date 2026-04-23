import React, { useState } from 'react';
import { BsRobot } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { FaRegCircleQuestion } from 'react-icons/fa6';

const CapSizeAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi! I'm your Cap Size Assistant. I'll help you find your perfect fit!",
    },
    {
      id: 2,
      type: 'bot',
      text: "Do you know your head circumference in inches or centimeters?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    measurement: null,
    unit: null,
    currentSize: null,
  });
  const [step, setStep] = useState(1);

  // Size conversion chart (59FIFTY fitted caps)
  const sizeChart = {
    '6 7/8': { inches: '21.5-21.8', cm: '54.6-55.3' },
    '7': { inches: '21.9-22.2', cm: '55.6-56.3' },
    '7 1/8': { inches: '22.3-22.6', cm: '56.6-57.3' },
    '7 1/4': { inches: '22.7-23.0', cm: '57.6-58.3' },
    '7 3/8': { inches: '23.1-23.4', cm: '58.6-59.3' },
    '7 1/2': { inches: '23.5-23.8', cm: '59.6-60.3' },
    '7 5/8': { inches: '23.9-24.2', cm: '60.6-61.3' },
    '7 3/4': { inches: '24.3-24.6', cm: '61.6-62.3' },
  };

  const findSizeFromMeasurement = (measurement, unit) => {
    let measurementCm = measurement;
    
    if (unit === 'inches') {
      measurementCm = measurement * 2.54;
    }

    for (const [size, ranges] of Object.entries(sizeChart)) {
      const rangeCm = ranges.cm.split('-').map(Number);
      if (measurementCm >= rangeCm[0] && measurementCm <= rangeCm[1]) {
        return size;
      }
    }
    return null;
  };

  const getSizeRecommendation = (measurement, unit) => {
    const size = findSizeFromMeasurement(measurement, unit);
    if (size) {
      return {
        size: size,
        message: `Based on your ${measurement}${unit === 'inches' ? '"' : 'cm'} head circumference, I recommend size **${size}**. This should give you a comfortable, secure fit.`,
      };
    }
    return {
      size: null,
      message: `Hmm, that measurement doesn't match our standard sizing. Could you please measure again? Make sure the tape is level and snug but not tight.`,
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Process based on conversation step
    setTimeout(() => {
      let botResponse = '';
      
      if (step === 1) {
        // User answering about knowing their measurement
        if (inputMessage.toLowerCase().includes('yes') || inputMessage.toLowerCase().includes('yeah') || inputMessage.toLowerCase().includes('know')) {
          botResponse = "Great! Please tell me your head circumference (e.g., '22.5 inches' or '57cm')";
          setStep(2);
        } else {
          botResponse = "No problem! Here's how to measure your head:\n\n📏 **How to Measure:**\n1. Use a soft measuring tape\n2. Wrap it around your head about 1 inch above your ears\n3. Keep it level and snug (not tight)\n4. Note the measurement in inches or cm\n\nOnce you have it, just tell me the number!";
          setStep(3);
        }
      } 
      else if (step === 2) {
        // User provides measurement
        const measurementMatch = inputMessage.match(/(\d+(?:\.\d+)?)\s*(?:inches?|in|cm)/i);
        if (measurementMatch) {
          const value = parseFloat(measurementMatch[1]);
          const unit = inputMessage.toLowerCase().includes('cm') ? 'cm' : 'inches';
          
          const recommendation = getSizeRecommendation(value, unit);
          botResponse = recommendation.message;
          
          if (recommendation.size) {
            botResponse += `\n\n**Size Chart for reference:**\n`;
            Object.entries(sizeChart).forEach(([size, ranges]) => {
              if (size === recommendation.size) {
                botResponse += `→ **${size}** - ${ranges.cm}cm / ${ranges.inches}" (Recommended)\n`;
              } else {
                botResponse += `  ${size} - ${ranges.cm}cm / ${ranges.inches}"\n`;
              }
            });
            botResponse += `\nWould you like me to help with anything else?`;
          }
          setStep(4);
        } else {
          botResponse = "I didn't catch that. Please tell me your measurement like '22.5 inches' or '57cm'";
        }
      }
      else if (step === 3) {
        // User needs measuring instructions
        botResponse = "Take your time to measure! When you're ready, just tell me your measurement like '22.5 inches' or '57cm'";
        setStep(2);
      }
      else {
        botResponse = "Is there anything else about cap sizing I can help you with? You can ask about:\n• How caps should fit\n• Breaking in new caps\n• Different fit types (fitted vs snapback)";
        setStep(4);
      }

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: "👋 Hi! I'm your Cap Size Assistant. Let's find your perfect fit!",
      },
      {
        id: 2,
        type: 'bot',
        text: "Do you know your head circumference in inches or centimeters?",
      },
    ]);
    setStep(1);
    setUserInfo({ measurement: null, unit: null, currentSize: null });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 group"
        >
          <BsRobot className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Cap Size Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <BsRobot className="w-5 h-5 text-white" />
              <div>
                <h3 className="font-semibold text-white">Cap Size Assistant</h3>
                <p className="text-xs text-blue-100">Find your perfect fit</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetChat}
                className="text-white hover:text-blue-200 transition"
                title="Reset chat"
              >
                <FaRegCircleQuestion className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 transition"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your measurement or question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm font-medium"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                💡 Try: "22.5 inches" or "57cm" or "How do I measure?"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CapSizeAssistant;