import { Component } from '@angular/core';
import { LogpanelComponent } from './components/logpanel/logpanel.component';

@Component({
  selector: 'app-root',
  imports: [LogpanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly patterns: RegExp[] = [/.*/g];
}
