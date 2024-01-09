import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatConversionModel, ChatbotService } from '../chatbot.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages: ChatConversionModel[] = [];
  userInput: string = '';
  constructor(private openAIService: ChatbotService) {}

  sendMessage() {
    const userMessage = this.userInput.trim();
    if (userMessage) {
      this.messages.push({
        content: userMessage,
        role: 'user'
      });
      this.userInput = ''; // Clear the input after sending

      this.openAIService.getResponse(this.messages).subscribe({
        next: (response: any) => {
          const botMessage = response.choices[0].message.content
          this.messages.push({ content: botMessage, role: 'system' });
        },
        error: (error) => {
          console.error('Error getting response from OpenAI:', error);
        }
      });
    }
  }
}
