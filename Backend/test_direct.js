const axios = require('axios');
require('dotenv').config();

async function testDirectFetch() {
    const apiKey = process.env.GEMINI_API_KEY;
    const models = ["gemini-1.5-flash", "gemini-pro"];
    const versions = ["v1", "v1beta"];

    for (const version of versions) {
        for (const model of models) {
            const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`;
            console.log(`\nTesting ${url}...`);
            try {
                const response = await axios.post(url, {
                    contents: [{ parts: [{ text: "Hi" }] }]
                });
                console.log(`✅ SUCCESS [${version}/${model}]:`, response.data.candidates[0].content.parts[0].text);
                return;
            } catch (e) {
                console.log(`❌ FAILED [${version}/${model}]:`, e.response?.status, e.response?.data?.error?.message || e.message);
            }
        }
    }
}

testDirectFetch();
