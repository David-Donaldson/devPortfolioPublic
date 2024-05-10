import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Observables {
  themeManager = new BehaviorSubject<string>('');
}
