import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from "@angular/core";
import {ChatService} from "./chat.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {NgClass} from "@angular/common";


@Component({
  selector: 'hp-chat',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex flex-col justify-between h-screen">
      <div class="overflow-auto p-4" #chatContainer>

        <ul class="space-y-4">
          @for (msg of chatResponse(); track msg) {
            <li class="p-2 rounded-md"
                [ngClass]="{'bg-blue-200': msg.role === 'user', 'bg-green-200': msg.role === 'assistant'}">
              {{ msg.role }}:
              {{ msg.content }}
            </li>
          }
        </ul>
      </div>

      <div class="p-4 bg-gray-200 sticky bottom-0">
        <input class="w-full p-2 rounded-md"
               placeholder="Ask me anything..."
               (keydown.enter)="handleUserPrompt($event)">
      </div>
    </div>
  `,
})
export class ChatComponent implements AfterViewInit, OnDestroy {
  private readonly chatService = inject(ChatService);
  private mutationObserver: MutationObserver;

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  chatResponse = toSignal(this.chatService.chatResponse$, { initialValue: [] });

  handleUserPrompt(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.chatService.updatePrompt(inputElement.value);
    inputElement.value = '';
  }

  ngAfterViewInit() {
    this.mutationObserver = new MutationObserver(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    });

    this.mutationObserver.observe(this.chatContainer.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
    this.chatService.updatePrompt('reset');
  }

}
