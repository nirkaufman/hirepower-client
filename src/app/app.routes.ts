import { Routes } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path: '', component: AppComponent},
  { path: 'chat', component: ChatComponent },
];
