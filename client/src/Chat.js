import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { colors } from './Theme';
import userAvatar from './assets/userAvatar.png';
import computerAvatar from './assets/computerAvatar.png';


let socket;

function Chat({ project }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false); // new state

    useEffect(() => {
        socket = io('http://localhost:5000');

        setMessages([{ text: "Hello! I'm here to assist you with any questions you have regarding this project.", sender: 'computer' }]);

        socket.on('receive_message', (message) => {
            setIsTyping(false); // new line
            setMessages((messages) => [...messages, { text: message, sender: 'computer' }]);
        });

        return () => {
            socket.off();
        };
    }, []);

    const handleSendMessage = (event) => {
        event.preventDefault();

        if (message) {
            setIsTyping(true); // new line
            socket.emit('send_message', { message: message, project: project.name });
            setMessages((messages) => [...messages, { text: message, sender: 'user' }]);
            setMessage('');
        }
    };

    return (
        <>
            <style>
                {`

            `}
            </style>
            <div style={styles.chatContainer}>
                <div style={styles.header}>
                    <h3 style={styles.headerTitle}>Chat with {project.name}</h3>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={styles.link}>Link to Github</a>
                </div>
                <div style={styles.messagesContainer}>
                    {messages.map((message, index) => (
                        <div style={message.sender === 'user' ? styles.userMessageContainer : styles.computerMessageContainer} key={index}>
                            {message.sender === 'computer' && <img src={computerAvatar} alt="avatar" style={styles.avatar} />} {/* This line only displays the computer avatar when the sender is the computer */}
                            <p style={message.sender === 'user' ? styles.userMessage : styles.computerMessage}>{message.text}</p>
                            {message.sender === 'user' && <img src={userAvatar} alt="avatar" style={styles.userAvatar} />} {/* This line only displays the user avatar when the sender is the user */}
                        </div>
                    ))}
                    {isTyping && <div className="typing-indicator"><span></span><span></span><span></span></div>} {/* new line */}
                </div>
                <form onSubmit={handleSendMessage} style={styles.inputContainer}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={styles.input}
                        placeholder="Type your message here..."
                    />
                    <button type="submit" style={styles.sendButton}>
                        Send
                    </button>
                </form>
            </div>
        </>
    );
}

const styles = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 110px)',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGrey,
        color: colors.text,
        fontFamily: "system-ui",
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid' + colors.grey,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        margin: 0,
        fontSize: '24px',
    },
    link: {
        textDecoration: 'none',
        fontSize: '20px',
        color: colors.text,
        border: '2px solid' + colors.text,
        padding: '5px',
        borderRadius: '5px'
    },
    messagesContainer: {
        flex: '1',
        overflowY: 'auto',
        padding: '20px',
        fontSize: '20px',
    },
    inputContainer: {
        display: 'flex',
        borderTop: '1px solid' + colors.grey,
        padding: '30px',
        alignItems: 'center',
        position: 'fixed',
        width: '80%',
        bottom: 0,
        backgroundColor: colors.lightGrey,
        left: '10%',
    },
    input: {
        flex: '1',
        border: 'none',
        borderRadius: '20px',
        padding: '15px 30px',
        marginRight: '10px',
        outline: 'none',
        fontSize: '20px',
        border: '2px solid' + colors.grey,
    },
    sendButton: {
        textDecoration: 'none',
        fontSize: '20px',
        color: colors.text,
        border: '2px solid' + colors.text,
        padding: '5px',
        borderRadius: '5px'
    },
    userMessageContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 0',
    },
    computerMessageContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '10px 0',
    },
    userMessage: {
        backgroundColor: colors.user_message_background,
        color: colors.white,
        padding: '10px',
        borderRadius: '10px',
    },
    computerMessage: {
        backgroundColor: colors.computer_message_background,
        color: colors.white,
        padding: '10px',
        borderRadius: '10px',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '25%',
        marginRight: '5px',
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '25%',
        marginLeft: '5px',
    },
};

export default Chat;