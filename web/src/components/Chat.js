import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'




const Chat = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);


    const handleOpen = () => {
        setIsOpen(true);
        setIsAnimating(false);
    };

    const handleClose = () => {
        setIsAnimating(true); 
        setTimeout(() => {
            setIsOpen(false); 
        }, 300);
    };

    

    return (
        <>
            {/* Button to open chatbox */}
            {!isOpen && (
                <button 
                    onClick={handleOpen} 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 text-white p-2 rounded-full fixed bottom-4 right-4"
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
                    <div className="p-4 h-72 overflow-y-auto">
                        <div className="flex flex-col space-y-2">
                            <div className="flex">
                                <div className="bg-blue-500 text-white p-2 rounded-lg">Test</div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-gray-200 p-2 rounded-lg">Test</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t">
                        <input 
                            type="text" 
                            className="w-full border rounded-lg p-2" 
                            placeholder="Type your message..." 
                        />
                    </div>
                </div>
            )}
</>
    )
}

export default Chat