import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Output()
  onSubmit = new EventEmitter();

  userForm: FormGroup;
  showError: boolean = false;
  showSuccess: boolean = false;

  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  phoneRegex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
  
  constructor() { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
      address: new FormControl('', Validators.required)
    });
  }

  submitUser(){
    this.showError = false;
    this.showSuccess = false;

    if(this.userForm.valid){
      let controls = this.userForm.controls;
      let user: User = {
        _id: Guid.create().toString(),
        firstName: controls['firstName'].value,
        lastName: controls['lastName'].value,
        company: controls['company'].value,
        email: controls['email'].value,
        phone: controls['phone'].value,
        address: controls['address'].value,
        index: 0
      };
  
      this.onSubmit.emit(user)

      this.showSuccess = true;
      this.userForm.reset();
    }
    else{
      this.showError = true;
    }
  }
}
