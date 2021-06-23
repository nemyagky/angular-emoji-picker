import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
    Renderer2,
    ViewContainerRef
} from "@angular/core";
import {EmojiPickerComponent} from "../components/emoji-picker/emoji-picker.component";


@Directive({
    selector: '[toggleEmojiPicker]'
})

export class ToggleEmojiPickerDirective {

    private emojiPickerComponent: ComponentRef<EmojiPickerComponent> | undefined;
    private isEmojiPickerOpen: boolean = false;

    // Handlers are contains renderer.listen(). Used to clear on close
    private mouseenterHandler: (() => void) | undefined;
    private mouseleaveHandler: (() => void) | undefined;
    private closeEmojiPickerTimeout: ReturnType<typeof setTimeout> | undefined;

    @HostListener('mouseenter') onMouseEnter() {
        this.show();
    }
    @Output() smilePressed: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private elementRef: ElementRef,
        private hostView: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetectorRef: ChangeDetectorRef,
        private resolver: ComponentFactoryResolver,
    ) {
    }

    private show(): void {
        if (!this.isEmojiPickerOpen) {
            const emojiPickerComponent = this.insertEmojiPickerToHtml();

            this.subscribeToEmojiPickerEvents(emojiPickerComponent);
            this.handleEmojiPickerClose(emojiPickerComponent);
            this.isEmojiPickerOpen = true;
        }
    }

    private insertEmojiPickerToHtml(): EmojiPickerComponent {
        const componentFactory = this.resolver.resolveComponentFactory(EmojiPickerComponent);
        this.emojiPickerComponent = this.hostView.createComponent(componentFactory);

        return this.emojiPickerComponent.instance;
    }

    private subscribeToEmojiPickerEvents(emojiPicker: EmojiPickerComponent): void {
        emojiPicker.smilePressed$.subscribe((smile: string) => {
            this.smilePressed.emit(smile);
        });
    }

    private handleEmojiPickerClose(emojiPicker: EmojiPickerComponent): void {

        this.mouseleaveHandler =
            this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => {
                    this.startCloseTimeout();
                }
            );
        emojiPicker.unfocused$.subscribe(() => {
            this.startCloseTimeout();
        })

        this.mouseenterHandler =
            this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => {
                    this.clearCloseTimeout();
                }
            );
        emojiPicker.focused$.subscribe(() => {
            this.clearCloseTimeout();
        })
    }

    private startCloseTimeout(): void {
        this.closeEmojiPickerTimeout = setTimeout(() => {
            this.hide();
        }, 500);
    }

    private clearCloseTimeout(): void {
        clearTimeout(this.closeEmojiPickerTimeout);
    }

    private hide(): void {
        // @ts-ignore
        // Starting close animation
        this.emojiPickerComponent?.instance.animationState = 'hide';
        this.changeDetectorRef.detectChanges();

        // Deleting hostView later to let animation execute
        setTimeout(() => {
            if (this.isEmojiPickerOpen)
                this.isEmojiPickerOpen = false;
            this.unsubscribeEmojiPickerEvents();
            this.hostView.remove();
        }, 150);
    }

    private unsubscribeEmojiPickerEvents(): void {
        const emojiPicker: EmojiPickerComponent | undefined = this.emojiPickerComponent?.instance;

        emojiPicker?.smilePressed$.unsubscribe();
        emojiPicker?.focused$.unsubscribe();
        emojiPicker?.unfocused$.unsubscribe();
        // @ts-ignore
        this.mouseleaveHandler();
        // @ts-ignore
        this.mouseenterHandler();
    }
}