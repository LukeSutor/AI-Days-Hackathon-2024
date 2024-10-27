import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useMemo } from 'react'
import axios from 'axios'



const Chat = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const chatBoxRef = useRef(null);


    const handleOpen = () => {
        setIsOpen(true);
        setIsAnimating(false);
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    const handleClose = () => {
        setIsAnimating(true); 
        setTimeout(() => {
            setIsOpen(false); 
        }, 300);
    };




    useEffect(() => {
        // Scroll to the bottom of the chat box whenever chatHistory changes
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, [chatHistory]);

    useEffect(() => {
        if (isOpen) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, [isOpen]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);

    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userInput.trim() === '') {
            return; 
        }
        setChatHistory((prev) => [...prev, { text: userInput, sender: 'user' }]);
        
        setUserInput('');

        setLoading(true);


        try {


            let message = userInput.trim();
            if (message.charAt(message.length - 1) !== '?') {
              message += '?'; // Append a question mark
            }

            const response = await axios.post('http://127.0.0.1:5000/chat', {
                prompt: message
            });

            if (response.data.answer || response.data.error) {
                const message = response.data.answer || response.data.error;

                setChatHistory((prev) => [...prev, { text: message, sender: 'bot' }]);
            
                
            console.log('Response from API:', response.data.answer);
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'An error occurred';
            setChatHistory((prev) => [...prev, { text: errorMessage, sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };
    
    const memoizedChatHistory = useMemo(() => chatHistory, [chatHistory]);


    return (
        <>
            {/* Button to open chatbox */}
            {!isOpen && (
                <button 
                    onClick={handleOpen} 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 text-white p-2 rounded-full fixed bottom-4 right-4 transition-transform duration-300 hover:scale-105"
                >
                    <FontAwesomeIcon icon={faComment} className="w-8 h-8"/>
                </button>
            )}

            {/* Chatbox */}
            {isOpen && (
                <div 
                    className={`bg-neutral-900 shadow-lg rounded-lg w-96 absolute bottom-4 right-4 transition-transform 
                        ${isAnimating ? 'slide-out' : 'slide-in'}`}
                >
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-slate-50">Virtual Strategist</h2>
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            className="absolute top-2 right-2 text-slate-50 hover:text-slate-500 cursor-pointer" 
                            onClick={handleClose} 
                        />
                </div>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="p-4 h-72 overflow-y-auto" ref={chatBoxRef}>
                        <div className="flex flex-col space-y-2">
                            {memoizedChatHistory.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`p-2 rounded-lg ${msg.sender === 'bot' ?  'bg-gray-200':'bg-blue-500 text-white'}`}                                    
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && <div className="flex items-center space-x-1">
                                            <p className="text-white leading-none -mt-1.5 mr-1">Typing</p>
                                            <div className="flex space-x-1 ">
                                                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                                            </div>
                                        </div>}

                        </div>
                    </div>
                    <div className="p-4 border-t flex">
                        <input 
                            type="text" 
                            className="w-full border rounded-lg p-2 mr-4 h-10" 
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}

                        />
                        <FontAwesomeIcon className="items-center justify-center size-6 h-10"icon={faPaperPlane} type="submit" style={{ cursor: 'pointer'}} onClick={handleSubmit}/>


                    </div>
                </div>
            )}
</>
    )
}

export default Chat