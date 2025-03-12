
import axios from 'axios';

export interface MonadAgentResponse {
  response: string;
}

/**
 * Send a message to the Monad agent
 * Note: This frontend-only version will connect to an external API endpoint
 */
export const sendMessageToAgent = async (
  input: string, 
  privateKey?: string
): Promise<MonadAgentResponse> => {
  try {
    // Get API endpoint from environment or use default external API
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.monad-agent.com';
    
    console.log('Connecting to external Aelix agent service:', API_ENDPOINT);
    
    // Set up request configuration
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    // Prepare request payload (only send what's needed for frontend)
    const payload = {
      input,
      privateKey: privateKey || undefined
    };
    
    // Send the request to external API
    const response = await axios.post(`${API_ENDPOINT}/agent`, payload, config);
    
    return response.data;
  } catch (error) {
    // Error logging
    if (axios.isAxiosError(error)) {
      console.error('API connection error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } else {
      console.error('Error sending message to Monad agent:', error);
    }
    
    throw new Error('Failed to connect to the Aelix agent service. Please check your network connection and try again.');
  }
};
