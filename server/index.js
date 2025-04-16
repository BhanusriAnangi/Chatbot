// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());


// Validate API Key
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ ERROR: OPENROUTER_API_KEY not found in .env file");
  process.exit(1);
}

// Initialize OpenRouter as OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // Use OpenRouter endpoint
});


app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // FREE model
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("❌ OpenRouter API Error:", err);
    res.status(500).json({ 
      error: "Failed to get reply from chatbot",
      details: err.message || "Unknown error"
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
