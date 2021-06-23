import {AfterViewInit, ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class AppComponent implements AfterViewInit {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit() {
    this.loadCss('emoji-font.css');
  }


  loadCss(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
        'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

}
