import { apiClient } from "./api.js"

export const chatService = {
    async askQuestion(prompt:string,onChunk :(text:string)=>void){
        const response = await apiClient.stream('/ask', { prompt });

        if(!response.body) {
            throw new Error('No response body');
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            lines.forEach(line => {
                if(line.startsWith('data: ')) {
                    onChunk(line.replace('data: ', ''));
                }
            });
        }
    }
}