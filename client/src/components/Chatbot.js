// src/components/Chatbot.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error getting response!" }]);
    }

    setInput("");
  };

  return (
    <Box sx={{ width: 400, height: 500, borderRadius: 2, p: 2, boxShadow: 4, bgcolor: "#fff" }}>
      <Typography variant="h6" gutterBottom>🤖 Chatbot Support</Typography>
      <Paper sx={{ height: 380, overflowY: "auto", p: 1, mb: 2 }}>
        {messages.map((msg, idx) => (
          <Box key={idx} textAlign={msg.sender === "user" ? "right" : "left"} mb={1}>
            <Typography
              variant="body2"
              sx={{
                display: "inline-block",
                p: 1,
                borderRadius: 2,
                bgcolor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                color: msg.sender === "user" ? "#fff" : "#000"
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleSend}>Send</Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
