import { Routes } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";
import {AppComponent} from "./app.component";
import {SearchComponent} from "./search/search.component";

export const routes: Routes = [
  {path: '', component: AppComponent},
  { path: 'chat', component: ChatComponent },
  { path: 'search', component: SearchComponent },
];
