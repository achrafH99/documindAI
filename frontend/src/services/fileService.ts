import { apiClient } from "./api.js";

export const fileService = {
  async uploadPDF(file: File) {
    const response = await apiClient.upload('/upload', file);
    if (!response.ok) throw new Error("Échec de l'upload");
    return response.json();
  }
};