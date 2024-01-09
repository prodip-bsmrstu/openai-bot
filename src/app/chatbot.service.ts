import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // or another engine

  constructor(private http: HttpClient) {}

  getResponse(messages: ChatConversionModel[]) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${"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"}`, // Replace with your actual OpenAI API key
      'Content-Type': 'application/json'
    });

    const data = {
      messages: messages,
      model: 'gpt-3.5-turbo-1106'
    };

    return this.http.post(this.apiUrl, data, { headers });
  }
}

export interface ChatConversionModel {
  content: string;
  role: string;
  name?: string;
};
