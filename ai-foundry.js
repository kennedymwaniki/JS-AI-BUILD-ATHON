import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();
console.log("KEY:", process.env.AZURE_INFERENCE_API_KEY);
console.log("Using endpoint:", process.env.AZURE_INFERENCE_SDK_ENDPOINT);
console.log("Using model:", process.env.AZUREAI_MODEL || "gpt-4o");

const client = new ModelClient(
  process.env.AZURE_INFERENCE_SDK_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_INFERENCE_API_KEY)
);

var messages = [
  { role: "system", content: "You are a helpful creative assistant" },
  { role: "user", content: "Explain the concept of Anime art styles" },
];

var response = await client.path("/chat/completions").post({
  body: {
    messages: messages,
    model: process.env.AZUREAI_MODEL || "gpt-4o",
    max_tokens: 4096,
  },
});

console.log("Response :", response);
console.log("Response status:", response.status);
console.log(
  "Response body structure:",
  JSON.stringify(Object.keys(response.body), null, 2)
);

console.log(response.body.choices[0].message.content);
