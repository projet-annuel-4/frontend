import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserService} from "./user.service";
import {UserModel} from "../../models/user.model";
import {of} from "rxjs";



describe('User Service test', () => {

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userService: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService=  new UserService(httpClientSpy);
  });


  it('should return the user', (done: DoneFn) =>{
    const expectedUser: UserModel =
      {
        id: "1", email: "test@gmail.com", password: "azerty",
        password2: "azerty", firstName: "kelyan", lastName: "bervin",
        pseudo: "kb", city: "Paris", address: "ESGI", phoneNumber:"123456789"
      };

    httpClientSpy.get.and.returnValue(of(expectedUser));

    userService.getUserInfo(expectedUser).subscribe({
      next: user => {
        expect(user)
          .withContext('expected user')
          .toEqual(expectedUser);
        done()
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {

    const user: UserModel =
      {
        id: "1", email: "test@gmail.com", password: "azertyuiop",
        password2: "azertyuiop", firstName: "kelyan", lastName: "bervin",
        pseudo: "kb", city: "Paris", address: "ESGI", phoneNumber:"123456789"
      };

    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    userService.getUserInfo(user).subscribe({
      next: users => done.fail('expected an error, not users'),
      error: error  => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    });

  });

});
