const API_BASE_URL = 'http://localhost:8000';

export const apiClient = {

    async post(endpoint: string, data: any) {
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    async upload(endpoint: string, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            body: formData,
        });
    },

    async stream(endpoint:string, data:any){
        return fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
}


