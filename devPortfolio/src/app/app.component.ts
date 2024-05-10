import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, throttleTime } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { NavigationStart, Router } from '@angular/router';
import { Observables } from './services/observables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  router = inject(Router);
  private spinner = inject(NgxSpinnerService);
  private loaderService = inject(LoaderService);
  private cdr = inject(ChangeDetectorRef);
  private themeManager$ = inject(Observables);

  title = 'devPortfolio';
  theme: any;
  currentPath: string = '';

  constructor() {
    if (this.currentPath != 'services') {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(100))
        .subscribe((event) => this.windowScroll(event));
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentPath = event.url.replace('/', '');

        if (this.currentPath == 'services') {
          const homeNav: any = document.querySelectorAll('.navbar a, .modal a');
          homeNav.forEach((el: HTMLAnchorElement) => {
            if (!el.innerHTML.includes('Services')) {
              el.classList.remove('active');
            }
          });
        }
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      status ? this.spinner.show() : this.spinner.hide();
    });
  }

  ngAfterViewChecked() {
    if (!localStorage.getItem('default_theme')) {
      localStorage.setItem('default_theme', 'main-theme');
    }
    this.theme = localStorage.getItem('default_theme');
    this.themeManager$.themeManager.next(this.theme);
    this.cdr.detectChanges();
  }

  /*
  receivedDataHandler($event: any) {
    this.theme = $event;
  }
*/

  toTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  windowScroll(event: Event): void {
    let scrollPosition = window.scrollY | document.documentElement.scrollTop;
    const scrollToTop: any = document.querySelector('#scrollToTop');

    //@ Scroll to top button start
    if (scrollPosition > 200) {
      scrollToTop.classList.add('display');
      scrollToTop.classList.remove('hidden');
    } else {
      scrollToTop.classList.add('hidden');
      scrollToTop.classList.remove('display');
    }
    //@ Scroll to top button end

    //@scroll Y axis chnage active end
    scrollPosition = scrollPosition + 300;
    const sections: any = document.querySelectorAll('.section');
    sections.forEach((section: HTMLElement) => {
      if (
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        let navlinks: any = document.querySelectorAll('.navbar a, .modal a');
        navlinks.forEach((link: HTMLAnchorElement) => {
          if (link.href.includes(section.id)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
    //@scroll Y axis chnage active end
  }
}
