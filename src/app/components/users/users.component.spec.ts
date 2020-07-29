import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/user';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUser: User;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
    mockUser = {
      _id: Guid.create().toString(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      company: 'Quicken Loans',
      address: '123 Fake St',
      phone: '555-555-5555',
      index: -1
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getUsers should call the UserService and retrieve data', () => {
    const spy = spyOn(userService, 'getUserData').and.returnValue(of([mockUser]));

    component.getUsers();

    expect(spy).toHaveBeenCalled();
  })

  it('#addUser should add a user to the array and set its index', () => {

    component.addUser(mockUser);

    expect(component.users.length).toEqual(1);
    expect(component.users[0].index).toEqual(0);
  })
});
