import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toObservable} from "@angular/core/rxjs-interop";
import { switchMap} from "rxjs";

export interface ChatMessage {
  role: string;
  content: string | null;
}

@Injectable({providedIn: 'root'})
export class ChatService {
  private readonly httpClient = inject(HttpClient);
  private readonly prompt = signal<string>('reset');

  private getResponse(userPrompt: string) {
    return this.httpClient.post<ChatMessage[]>(`http://localhost:3000/chat`, {message: userPrompt}, {
      responseType: 'json'
    });
  }

  chatResponse$ = toObservable(this.prompt).pipe(
    switchMap((message) => this.getResponse(message)),
  );

  updatePrompt(input: string) {
    this.prompt.set(input);
  }
}
