import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {EmojiGroup} from "../../interfaces/emoji-group.interface";
import * as emojiGroups from '../../constants/emoji-groups.constant';

@Component({
    selector: 'emoji-picker',
    templateUrl: './emoji-picker.component.html',
    styleUrls: ['./emoji-picker.component.scss']
})

export class EmojiPickerComponent implements AfterViewInit {

    // @Output() onMouseleave = new EventEmitter();
    // @HostListener('mouseleave') onMouseLeave() {
    //   this.onMouseleave.emit();
    // }
    @Output() smilePressed$: EventEmitter<string> = new EventEmitter<string>();

    public emojiGroups: EmojiGroup[] = emojiGroups.default;
    public animationState: 'hide' | 'active' = 'hide';

    public focused$: EventEmitter<any> = new EventEmitter();
    @HostListener('mouseenter') onMouseEnter() {
        this.focused$.emit();
    }

    public unfocused$: EventEmitter<any> = new EventEmitter();
    @HostListener('mouseleave') onMouseLeave() {
        this.unfocused$.emit();
    }


    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.animationState = 'active';
            this.changeDetectorRef.detectChanges();
        }, 0);
    }


    public updateEmojis(emojiGroups: EmojiGroup[]): void {
        this.emojiGroups = emojiGroups;
    }

    public onSmilePress(smile: string): void {
        this.smilePressed$.emit(smile);
    }

}
