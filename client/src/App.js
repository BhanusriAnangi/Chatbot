// src/App.js
import React from 'react';
import Chatbot from './components/Chatbot';
import { Container } from '@mui/material';

function App() {
  return (
    <Container sx={{ mt: 5 }}>
      <Chatbot />
    </Container>
  );
}

export default App;
