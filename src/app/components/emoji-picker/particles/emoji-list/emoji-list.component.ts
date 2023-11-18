import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {EmojiGroup} from "../../../../interfaces/emoji-group.interface";
import {EmojiService} from "../../../../core/emoji.service";

@Component({
  selector: 'emoji-list',
  templateUrl: 'emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmojiListComponent implements OnInit {

  @Input() emojiGroups: EmojiGroup[] = [];
  @Output() smilePressed$: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('emojiList') emojiListRef: ElementRef | undefined;

  private groupsToShow: number = 2;
  private readonly maxGroupsCount: number = 7;

  constructor(
      private emojiService: EmojiService
  ) {}

  ngOnInit(): void {
    this.emojiService.tabSwitchEvent$?.subscribe(() => {
      // Restore scrollbar height to default
      this.groupsToShow = 2;
    })
  }

  public handleSmilePress(emoji: string) {
    this.smilePressed$.emit(emoji);
  }

  public changeEmojiGroupsOnScroll(): void {
    const scrollTop: number = this.emojiListRef?.nativeElement.scrollTop;
    const elemOffsetHeight: number = this.emojiListRef?.nativeElement.offsetHeight;
    const elemScrollHeight: number = this.emojiListRef?.nativeElement.scrollHeight;

    if (this.maxGroupsCount === this.groupsToShow) {
      return;
    }

    if (elemScrollHeight - elemOffsetHeight - scrollTop < 400) {
      if (this.groupsToShow + 2 <= this.maxGroupsCount) {
        this.groupsToShow += 2;
      } else {
        this.groupsToShow = this.maxGroupsCount;
      }
    }
  }
}
