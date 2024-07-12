import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.css'
})
export class SupportChatComponent implements OnInit {

  query: string = '';
  response:string = '';
  messages = [
    
      {
        "role": "system",
        "content": "You are a helpful assistant for our web app, Dishdash, which helps people order food online from restaurants. Only answer queries related to our application within 50-100 words. If a user asks a question you don't know, respond with: 'Your query is sent to our team. One of our representatives will contact you.'"
      }
    
  ]

  ngOnInit(): void {
  }

  constructor(private chatService:ChatServiceService) {}

  generateMessages() {
    let msg = {
      "role":"user",
      "content":this.query
    }

    this.messages.push(msg);
    this.query = ''

    this.chatService.generateSupportQuery(this.messages).subscribe({
      next:data => {
        console.log("data fetch success")
        console.log(data);

        this.response = data.choices[0].message.content;

        
        let chatMessage =  {
          "role":"assistant",
          "content":this.response
        }

        console.log(chatMessage);

        this.messages.push(chatMessage);
       
      },
      error:e => {
        console.log("Error while fetching response")
        console.log(e);

      }
    })

  }




}
