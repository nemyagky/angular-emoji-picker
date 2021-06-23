import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmojiService {

  public tabSwitchEvent$: EventEmitter<any> = new EventEmitter<any>();
  public recentlyUsedEmojis: string[] = [];

  constructor() { }

  public addToRecentlyUsedEmojis(smile: string): void {
    if (this.recentlyUsedEmojis.length >= 25) {
      this.recentlyUsedEmojis.shift();
    }

    if (!this.recentlyUsedEmojis.includes(smile)) {
      this.recentlyUsedEmojis.push(smile);
    } else {
      this.recentlyUsedEmojis = this.recentlyUsedEmojis.filter((current: string) => current !== smile);
      this.recentlyUsedEmojis.push(smile);
    }
  }

}
