// src/utils/monadAgent.ts
import axios from "axios";

export const sendMessageToAgent = async (input: string, privateKey?: string) => {
  const apiEndpoint = process.env.VITE_API_ENDPOINT || "https://your-render-backend.onrender.com/api/agent"; // Update with Render URL
  console.log("Sending to:", apiEndpoint);
  try {
    const response = await axios.post(apiEndpoint, { input, privateKey }, { headers: { "Content-Type": "application/json" } });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};