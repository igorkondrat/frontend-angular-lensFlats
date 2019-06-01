import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {RegistrationService} from '../../Services/registration.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('showRegistration', [
      transition('void=>*', [
        style({borderRadius: '100px', opacity: 0}),
        animate(300, style({borderRadius: '10px', opacity: 1}))
      ])
    ])
  ]
})

export class RegistrationComponent implements OnInit {
  rForm: FormGroup;
  user = {
    name: 'Igor',
    surname: 'Kondrat',
    password: '111',
    confirmPassword: '111',
    email: 'igooor.kondrat1998@gmail.com'
  };

  answer: string;
  wait: boolean;

  constructor(private RegService: RegistrationService, private router: Router, private fb: FormBuilder) {
    this.rForm = this.fb.group({});
  }

  register(regForm: NgForm) {
    this.wait = true;
    this.RegService.userRegister(regForm.value).subscribe((response: any) => {
      this.wait = false;
        this.answer = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  closeChanged() {
    this.router.navigate(['/']);
  }

}
