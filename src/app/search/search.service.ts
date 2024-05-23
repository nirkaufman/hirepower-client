import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {toObservable} from "@angular/core/rxjs-interop";
import {switchMap} from "rxjs";


export interface SearchResult {
  pageContent: string
  metadata: {
    source: number,
    name: string
  }
}

@Injectable({providedIn: 'root'})
export class SearchService {
  private readonly httpClient = inject(HttpClient);
  private readonly prompt = signal<string>('');

  private getResponse(userQuery: string) {
    return this.httpClient.post<SearchResult[]>(`http://localhost:3000/search`, {query: userQuery}, {
      responseType: 'json'
    });
  }

  searchResponse$ = toObservable(this.prompt).pipe(
    switchMap((userQuery) => this.getResponse(userQuery)),
  );

  updateQuery(userInput: string) {
    this.prompt.set(userInput);
  }

}
