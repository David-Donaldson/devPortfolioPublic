import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { Observables } from '../services/observables';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  theme: any;
  themeManager$ = inject(Observables);
  ngOnInit(): void {
    this.themeManager$.themeManager.subscribe((val) => {
      this.theme = val;
    });
  }
  isChecked: boolean = false;
  //@Output() emittedTheme = new EventEmitter<string>();

  ngAfterViewInit() {
    this.darkModeToggle();
    this.themeChecker();
  }

  darkModeToggle(): void {
    const swapOfftoggle = document.querySelector('.swap-off');
    swapOfftoggle?.addEventListener('click', () => {
      localStorage.setItem('default_theme', 'main-theme');
      this.theme = 'main-theme';
      this.themeManager$.themeManager.next(this.theme);
      this.isChecked = true;
      //this.emittedTheme.emit(this.theme);
    });

    const swapOntoggle = document.querySelector('.swap-on');
    swapOntoggle?.addEventListener('click', () => {
      localStorage.setItem('default_theme', 'dark');
      this.theme = 'dark';
      this.themeManager$.themeManager.next(this.theme);
      this.isChecked = false;
      //this.emittedTheme.emit(this.theme);
    });
  }

  themeChecker(): void {
    switch (localStorage.getItem('default_theme')) {
      case 'dark':
        this.theme = localStorage.getItem('default_theme');
        this.themeManager$.themeManager.next(this.theme);
        this.isChecked = true;
        break;
      case 'main-theme':
        this.theme = localStorage.getItem('default_theme');
        this.themeManager$.themeManager.next(this.theme);
        this.isChecked = false;
        break;
      default:
        this.isChecked = false;
        break;
    }
  }
}
