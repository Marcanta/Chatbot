import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
    organization: "org-Yxv7QVSzqV1qbIAJIo8UH3jN",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function callChatGPT(chats) {
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant utile dans une boutique d'équipement d'escalade",
            },
            { role: "user", content: "Quel chaussons pour faire de la voie ?" },         
            { role: "assistant", content: "Les chaussons les plus adaptés sont: 1. La Sportiva Solution, 2. Scarpa Instinct, 3. Five Ten Anasazi, 4. La Sportiva Katana, 5. Scarpa Vapor V"},
          ...chats,
        ],
    });
}

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (request, response) => {
    const { chats } = request.body;
    const result = await callChatGPT(chats)
    response.json(result.data.choices[0].message)
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});