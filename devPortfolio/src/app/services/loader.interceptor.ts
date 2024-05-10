import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private count = 0;
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.loaderService.setHttpProgressStatus(true);
    }
    this.count++;
    return next.handle(request).pipe(
      tap({
        next: () => {},
        error: (error: any) => {
          console.log(error.statusText);
        },
        finalize: () => {
          this.count--;
          if (this.count === 0) {
            this.loaderService.setHttpProgressStatus(false);
          }
        },
      })
    );
  }
}
