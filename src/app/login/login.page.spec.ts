import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot', 'navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: NavController, useValue: navCtrlSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login errors and show the appropriate message', () => {
    spyOn<any>(component, 'presentAlert');
  
    const error = { code: 'auth/user-not-found' };
    component.handleLoginError(error);
  
    expect(component['presentAlert']).toHaveBeenCalledWith(
      'Error','El correo ingresado no está registrado.'
    );
  });
  
  it('should navigate to the register page when register() is called', () => {
    component.register();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith('/register');
  });
  

});
