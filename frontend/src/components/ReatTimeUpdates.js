import React, { useState, useEffect } from 'react';

function RealTimeUpdates() {
    const [messages, setMessages] = useState([]); // Store incoming messages

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001');

        socket.onopen = () => {
            console.log('WebSocket connected');
            socket.send('Hello from the client!');
        };

        socket.onmessage = (event) => {
            console.log('Server message:', event.data);
            setMessages((prevMessages) => [...prevMessages, event.data]); // Append new message
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close(); // Clean up connection
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Updates</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default RealTimeUpdates;
