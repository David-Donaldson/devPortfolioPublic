import { Component, inject } from '@angular/core';
import { Observables } from './observables';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  theme: any;
  themeManager$ = inject(Observables);

  constructor() {
    this.themeManager$.themeManager.subscribe({
      next: (value) => {
        this.theme = value;
      },
    });

    window.scroll(0, 0);
  }
}
