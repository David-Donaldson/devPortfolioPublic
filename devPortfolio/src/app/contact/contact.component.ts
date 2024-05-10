import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpService } from '../services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() theme: any;
  contactForm!: FormGroup;
  submitted: boolean = false;
  contactFormObservable: Object = {};
  @ViewChild('successModal') modalContent!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private _http: HttpService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      ContactName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.required, Validators.email]],
      EmailMessage: ['', [Validators.required]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.reCaptchaV3Service
      .execute('importantAction')
      .subscribe((captchaToken: string) => {
        this.contactFormObservable = this._http
          .submitContactForm(this.contactForm.value, captchaToken)
          .subscribe({
            next: (result) => {
              this.submitted = false;
              this.contactForm.reset();
              Swal.fire({
                //position: "top-end",
                icon: 'success',
                title: 'Sucessfully Sent!',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong!',
              });
            },
          });
      });
  }
}
