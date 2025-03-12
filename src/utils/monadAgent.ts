// src/utils/monadAgent.ts
import axios from "axios";

export const sendMessageToAgent = async (input: string, privateKey?: string) => {
  const apiEndpoint = process.env.VITE_API_ENDPOINT || "/api/agent"; // Relative path for Vercel
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