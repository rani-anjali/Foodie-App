import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http:HttpClient) { }

  generateSupportQuery(messages:any):Observable<any> {
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer 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'
    });

    const data = {
      "model": "gpt-3.5-turbo",
      "messages":messages
      
    };
    return this.http.post<any>('https://api.openai.com/v1/chat/completions', data, {headers})

  }
}
