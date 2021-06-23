import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmojiService {

  public tabSwitchEvent$: EventEmitter<any> = new EventEmitter<any>();
  public recentlyUsedEmojis: string[] = [];

  constructor() { }

  public addToRecentlyUsedEmojis(smile: string): void {
    if (!this.recentlyUsedEmojis.includes(smile)) {
      if (this.recentlyUsedEmojis.length >= 25) {
        this.recentlyUsedEmojis.shift();
      }

      this.recentlyUsedEmojis.push(smile);
    }
  }

}
