import { Directive, ElementRef, NgZone, inject } from '@angular/core';

@Directive({
  selector: '[appMouseEvents]',
})
export class MouseEventsDirective {
  //private element = inject(ElementRef);
  constructor(private element: ElementRef) {
    this.element.nativeElement.addEventListener('mouseenter', (e: any) => {
      switch (this.element.nativeElement.id) {
        case 'portairArea':
          this.element.nativeElement.src = '../../assets/portair.gif';
          break;
        case 'troubleshootingArea':
          this.element.nativeElement.src = '../../assets/troubleshooting.gif';
          break;
        case 'portfolioArea':
          this.element.nativeElement.src = '../../assets/portfolio.gif';
          break;
        default:
          break;
      }
    });

    this.element.nativeElement.addEventListener('mouseleave', (e: any) => {
      switch (this.element.nativeElement.id) {
        case 'portairArea':
          this.element.nativeElement.src = '../../assets/portairlogistix.PNG';
          break;
        case 'troubleshootingArea':
          this.element.nativeElement.src = '../../assets/troubleshooting.PNG';
          break;
        case 'portfolioArea':
          this.element.nativeElement.src = '../../assets/portfolio.PNG';
          break;
        default:
          break;
      }
    });
  }
}
