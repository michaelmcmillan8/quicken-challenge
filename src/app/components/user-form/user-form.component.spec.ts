import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitUser', () => {
    it('should show an error message if the form is invalid', () => {
      expect(component.userForm.valid).toBeFalse();

      component.submitUser();

      fixture.detectChanges();

      let msgEl = fixture.nativeElement.querySelector('.errorMsg');
      expect(msgEl).toBeTruthy();
    });

    it('should show an error message if the phone or email regex fails', () =>{
      component.userForm.controls['firstName'].setValue('John');
      component.userForm.controls['lastName'].setValue('Doe');
      component.userForm.controls['company'].setValue('Quicken Loans');
      component.userForm.controls['email'].setValue('john.doe@gmail.com');
      component.userForm.controls['phone'].setValue('555');
      component.userForm.controls['address'].setValue('123 Fake St');

      component.submitUser();

      fixture.detectChanges();

      let msgEl = fixture.nativeElement.querySelector('.errorMsg');
      expect(msgEl).toBeTruthy();

      component.userForm.controls['phone'].setValue('555-555-5555');
      component.userForm.controls['email'].setValue('john.doe');

      component.submitUser();

      fixture.detectChanges();

      msgEl = fixture.nativeElement.querySelector('.errorMsg');
      expect(msgEl).toBeTruthy();
    })

    it('should show a success message and clear the form if the form is valid', () => {
      component.userForm.controls['firstName'].setValue('John');
      component.userForm.controls['lastName'].setValue('Doe');
      component.userForm.controls['company'].setValue('Quicken Loans');
      component.userForm.controls['email'].setValue('john.doe@gmail.com');
      component.userForm.controls['phone'].setValue('555-555-5555');
      component.userForm.controls['address'].setValue('123 Fake St');

      component.submitUser();

      fixture.detectChanges();

      let msgEl = fixture.nativeElement.querySelector('.successMsg');
      expect(msgEl).toBeTruthy();

      expect(component.userForm.untouched).toBeTrue();
    })
  })
});
