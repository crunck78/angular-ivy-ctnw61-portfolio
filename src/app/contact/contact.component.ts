import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  /**
   * This is bind to ngForm's InputFields in Template File
   */
  contact = {
    name: '', //Bind  to InputField name="name"
    email: '', //Bind to InputField name="email"
    message: '', //Bind to InputField name="message"
  };

  /**
   * A post request construct configuration
   */
  post = {
    // Where to send the post request Ex. www.my-domain/sendMail.php
    endPoint: '',
    // What to send
    body: (payload: any) => JSON.stringify(payload),
    // How to send
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };
  constructor(private http: HttpClient, public navigation: NavigationService) {}

  ngOnInit() {}

  /**
   * Do not forget to import FormsModule in app.module.ts
   */
  onSubmit(ngForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contact))
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.error(error),
          complete: () => console.info('send post complete'),
        });
    }
  }
}
