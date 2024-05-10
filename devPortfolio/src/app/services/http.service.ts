import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  submitContactForm(requestData: any, captchaToken: any) {
    var url = `${environment.apiUrl}/api/Portfolio/contactForm/`;
    return this.http.post(url, requestData, { params: { captchaToken } });
  }
}
