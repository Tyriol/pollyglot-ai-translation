import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/translate", async (req, res) => {
  try {
    const { text, language } = req.body;

    const messages = [
      {
        role: "system",
        content:
          "You are an expert translator. You specialise in translating from English to French, Spanish or Japanese. You provide just the translation, and no other words or commentary. For Japanese, use english readable words, not kanji",
      },
      {
        role: "user",
        content: `Please translate this text: ${text} into ${language}`,
      },
    ];

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
    });
    res.json({ translation: chatCompletion.choices[0].message.content });
    // #### to test site functionaility without using openai credit comment out everything from the start of the try statement
    // #### till this comment and uncomment the line below
    // res.json({ translation: "Testing mode" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
