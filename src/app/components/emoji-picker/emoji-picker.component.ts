import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {EmojiGroup} from "../../interfaces/emoji-group.interface";
import * as emojiGroups from '../../constants/emoji-groups.constant';

@Component({
    selector: 'emoji-picker',
    templateUrl: './emoji-picker.component.html',
    styleUrls: ['./emoji-picker.component.scss']
})

export class EmojiPickerComponent implements AfterViewInit {

    @Output() smilePressed$: EventEmitter<string> = new EventEmitter<string>();

    public emojiGroups: EmojiGroup[] = emojiGroups.default;
    public animationState: 'hide' | 'active' = 'hide';

    public hovered$: EventEmitter<any> = new EventEmitter();
    public unhovered$: EventEmitter<any> = new EventEmitter();

    @HostListener('mouseleave') onMouseLeave() {
        this.unhovered$.emit();
    }
    @HostListener('mouseenter') onMouseEnter() {
        this.hovered$.emit();
    }



    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        // To let animation execute
        setTimeout(() => {
            this.animationState = 'active';
            this.changeDetectorRef.detectChanges();
        }, 0);
    }

    public updateEmojis(emojiGroups: EmojiGroup[]): void {
        this.emojiGroups = emojiGroups;
    }

    public handleSmilePress(smile: string): void {
        this.smilePressed$.emit(smile);
    }

}
