import {ChangeDetectionStrategy, Component, EventEmitter} from '@angular/core';
import {EmojiService} from "../../core/emoji.service";

@Component({
  selector: 'chat-block',
  templateUrl: './chat-block.component.html',
  styleUrls: ['./chat-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatBlockComponent {
  public smileClickEvent$: EventEmitter<string> = new EventEmitter();

  constructor(
      private emojiService: EmojiService
  ) {
  }

  public handleSmilePress(smile: string): void {
    this.smileClickEvent$.emit(smile);
    this.emojiService.addToRecentlyUsedEmojis(smile);
  }
}
