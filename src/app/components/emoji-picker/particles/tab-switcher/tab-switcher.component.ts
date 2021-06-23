import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {EmojiService} from "../../../../core/emoji.service";
import * as emojiGroups from '../../../../constants/emoji-groups.constant';
import {EmojiGroup} from "../../../../interfaces/emoji-group.interface";

@Component({
    selector: 'tab-switcher',
    templateUrl: 'tab-switcher.component.html',
    styleUrls: ['tab-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TabSwitcherComponent {
    public activeTab: 'default' | 'recently-used' = 'default';

    @Output() onTabSwitch: EventEmitter<EmojiGroup[]> = new EventEmitter<EmojiGroup[]>();

    constructor(
        private emojiService: EmojiService
    ) {
    }

    public switchTab(activeTab: 'default' | 'recently-used') {
        const newEmojis = activeTab === 'default'
            ? emojiGroups.default
            : this.getRecentlyUsedEmojis();

        this.activeTab = activeTab;
        this.onTabSwitch.emit(newEmojis);
        this.emojiService.tabSwitchEvent$.emit();
    }

    private getRecentlyUsedEmojis(): EmojiGroup[] {
        return [{
            title: 'Недавно использованные',
            items: this.emojiService.recentlyUsedEmojis
        }];
    }

}
