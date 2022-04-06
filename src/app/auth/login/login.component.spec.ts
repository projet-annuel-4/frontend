import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {Router} from "@angular/router";
import {createComponent} from "@angular/compiler/src/core";

/*
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

/*

class Login {

  get emailInput(){
    return this.query<HTMLInputElement>('input');
  }
  get passwordInput(){
    return this.query<HTMLInputElement>('input');
  }

  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }

  get loginBtn (){
    return this.buttons[0];
  }
  get forgotBtn (){
    return this.buttons[1];
  }
  get registerBtn (){
    return this.buttons[2];
  }
  get googleBtn (){
    return this.buttons[3];
  }
  get facebookBtn (){
    return this.buttons[4];
  }
  get githubBtn (){
    return this.buttons[5];
  }


  goToRegister: jasmine.Spy;
  navigateSpy: jasmine.Spy;


  constructor(someFixture: ComponentFixture<LoginComponent>) {
    // get the navigate spy from the injected router spy object
    const routerSpy = someFixture.debugElement.injector.get(Router) as any;
    this.navigateSpy = routerSpy.navigate;

    // spy on component's `gotoList()` method
    const someComponent = someFixture.componentInstance;
    this.goToRegister = spyOn(someComponent, 'goToRegister').and.callThrough();
  }



  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }

  createComponent() {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    const page = new Login(fixture);

    // 1st change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched hero
      fixture.detectChanges();
    });
  }


}


describe('when navigate to existing hero', () => {
  let login: Login;

  beforeEach(async () => {
    //expectedHero = firstHero;
    //activatedRoute.setParamMap({id: expectedHero.id});
    await createComponent();
  });

  it('should navigate when click cancel', () => {
    //click(login.forgotBtn);
    expect(login.navigateSpy.calls.any())
      .withContext('router.navigate register')
      .toBe(true);
  });
});

*/
