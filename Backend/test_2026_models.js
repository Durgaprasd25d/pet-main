const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

async function listModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Trying 2026 models
        const modelsToTry = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-2.5-flash", "gemini-3.0-flash"];
        
        for (const modelName of modelsToTry) {
            console.log(`\n--- Testing Model: ${modelName} ---`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Say 'System Online'");
                const response = await result.response;
                console.log(`✅ SUCCESS [${modelName}]:`, response.text());
                return modelName;
            } catch (e) {
                console.log(`❌ FAILED [${modelName}]:`, e.status, e.message);
            }
        }
    } catch (err) {
        console.error("GENERAL SCRIPT ERROR:", err);
    }
}

listModels();
