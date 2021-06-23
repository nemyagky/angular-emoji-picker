import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { NgxJoypixelsModule } from 'ngx-joypixels';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatBlockComponent} from './components/chat-block/chat-block.component';
import {FormsModule} from "@angular/forms";
import {EmojiPickerComponent} from './components/emoji-picker/emoji-picker.component';
import {EmojiListComponent} from "./components/emoji-picker/particles/emoji-list/emoji-list.component";
import {ToggleEmojiPickerDirective} from "./directives/toggle-emoji-picker.directive";
import { TabSwitcherComponent } from './components/emoji-picker/particles/tab-switcher/tab-switcher.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatBlockComponent,
        EmojiPickerComponent,
        ToggleEmojiPickerDirective,
        EmojiListComponent,
        TabSwitcherComponent,
        TextareaComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxJoypixelsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
