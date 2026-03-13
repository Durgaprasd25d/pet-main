const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

async function listModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("NO API KEY FOUND IN .ENV");
            return;
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        console.log("Checking API Key Prefix:", apiKey.substring(0, 10));
        
        // List of models to try
        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-pro"];
        
        for (const modelName of modelsToTry) {
            console.log(`\n--- Testing Model: ${modelName} ---`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Say 'System Online'");
                const response = await result.response;
                console.log(`✅ SUCCESS [${modelName}]:`, response.text());
                return modelName;
            } catch (e) {
                console.log(`❌ FAILED [${modelName}]`);
                console.log(`   Error Status: ${e.status}`);
                console.log(`   Error Message: ${e.message}`);
            }
        }
        console.log("\nAll tested models failed.");
    } catch (err) {
        console.error("GENERAL SCRIPT ERROR:", err);
    }
}

listModels().then(workingModel => {
    if (workingModel) {
        console.log("\nRECOMMENDED MODEL:", workingModel);
    } else {
        console.log("\nNo working model found. Please check API key permissions or region restrictions.");
    }
});
