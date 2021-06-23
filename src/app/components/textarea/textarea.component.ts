import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'custom-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {

  @Input() smileClick$: EventEmitter<string> = new EventEmitter();
  @ViewChild('textArea') textArea: ElementRef | undefined;

  public textAreaValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.handleSmileClicks();
  }

  private handleSmileClicks(): void {
    this.smileClick$.subscribe((smile: string) => {
      this.insertSmileIntoTextarea(smile);
    })
  }

  private insertSmileIntoTextarea(smile: string): void {
    const textareaCursorPos = {
      start: this.textArea?.nativeElement.selectionStart,
      end: this.textArea?.nativeElement.selectionEnd
    }

    this.textAreaValue =
        this.textAreaValue.slice(0, textareaCursorPos.start) +
        smile +
        this.textAreaValue.slice(textareaCursorPos.end, this.textAreaValue.length);

    // nativeElement does not have time to re-render
    setTimeout(() => {
      this.updateTextareaHeight();
    }, 0);
  }


  public updateTextareaHeight(): void {
    const textArea = this.textArea?.nativeElement;

    if (textArea.scrollHeight < 320) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = '0px';

      // This numbers are due to textarea paddings
      if (textArea.scrollHeight <= 40) {
        textArea.style.height = '16px';
      } else {
        textArea.style.height = textArea.scrollHeight - 19 + 'px';
      }
    } else {
      textArea.style.overflowY = 'scroll';
      textArea.style.height = '300px';
    }
  }

  public focusTextarea(): void {
    this.textArea?.nativeElement.focus();
  }

}
