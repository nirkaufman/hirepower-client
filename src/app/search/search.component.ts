import {Component, effect, inject} from '@angular/core';
import {SearchService} from "./search.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'hp-search',
  standalone: true,
  template: `
    <div class="flex flex-col justify-between h-screen">
      <div class="overflow-auto p-4">
      @for (result of searchResponse(); track result) {
        <div class=" p-2 bg-white p-6 border rounded shadow-lg mb-4">
          <h3 class="text-xl font-bold mb-2">{{ result.metadata.name }}</h3>
          <p class="text-gray-700">{{ result.pageContent }}</p>
        </div>
      }
      </div>
      <div class="p-4 bg-gray-200 sticky bottom-0">
        <input class="w-full p-2 rounded-md"
                placeholder="Search for candidate..."
               (keydown.enter)="handleUserQuery($event)">
      </div>

    </div>
  `,
})
export class SearchComponent {
 private readonly searchService = inject(SearchService);

 searchResponse = toSignal(this.searchService.searchResponse$, { initialValue: [] })

  handleUserQuery(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchService.updateQuery(inputElement.value);
    inputElement.value = '';
  }
}
