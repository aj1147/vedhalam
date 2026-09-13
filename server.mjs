import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for the Vedhalam website.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "openai/gpt-oss-20b",
      max_tokens: 500,
    });

    res.json({
      reply: completion.choices[0]?.message?.content || "No response",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong with Groq",
    });
  }
});

app.listen(3001, () => {
  console.log("Groq backend running at http://localhost:3001");
});