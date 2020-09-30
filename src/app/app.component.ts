import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SampleApp';
  language = 'en';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage(language: string){
    if (language == 'en') {
      this.translate.use('vi');
      this.language = 'vi';
    } else {
      this.translate.use('en');
      this.language = 'en';
    }
  }
}
