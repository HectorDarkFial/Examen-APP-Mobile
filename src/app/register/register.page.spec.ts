import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [{ provide: AlertController, useValue: alertControllerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format correctly', () => {
    expect(component.isEmailValid('test@example.com')).toBeTrue();
    expect(component.isEmailValid('invalid-email')).toBeFalse();
  });
  
  it('should validate password correctly', () => {
    const validPassword = 'Strong1@';
    const invalidPassword = 'weak';
  
    expect(component.validatePassword(validPassword)).toBeTrue();
    expect(component.validatePassword(invalidPassword)).toBeFalse();
  });

  

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
  
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeTrue();
  
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeFalse();
  });
  
  it('should toggle confirm password visibility', () => {
    expect(component.confirmPasswordVisible).toBeFalse();
  
    component.toggleConfirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeTrue();
  
    component.toggleConfirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeFalse();
  });
  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
  
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeTrue();
  
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeFalse();
  });
  
  it('should toggle confirm password visibility', () => {
    expect(component.confirmPasswordVisible).toBeFalse();
  
    component.toggleConfirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeTrue();
  
    component.toggleConfirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeFalse();
  });
    
  // Prueba para Manejar Contraseñas que No Coinciden
  it('should show an error alert if passwords do not match', async () => {
    spyOn<any>(component, 'presentAlert');
  
    component.email = 'test@example.com';
    component.password = 'Strong1@';
    component.confirmPassword = 'Different1@';
  
    await component.handleCreateAccount();
  
    expect(component['presentAlert']).toHaveBeenCalledWith(
      'Error',
      'Las contraseñas no coinciden.'
    );
  });
  
  // Prueba para Deshabilitar Botón Durante la Carga
  it('should disable the register button while loading', async () => {
    component.loading = true;
    fixture.detectChanges();
  
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button.disabled).toBeTrue();
  });
  
  // Prueba para Validar Mensaje de Error Predeterminado
  it('should return a default error message for unknown error codes', () => {
    const errorMessage = component.getErrorMessage('unknown-error-code');
    expect(errorMessage).toBe('Ocurrió un error inesperado.');
  });
  
  // Para Validar que se Muestra una Alerta con Email Inválido
  it('should show an error alert if the email is invalid', async () => {
    spyOn<any>(component, 'presentAlert');
  
    component.email = 'invalid-email';
    component.password = 'Strong1@';
    component.confirmPassword = 'Strong1@';
  
    await component.handleCreateAccount();
  
    expect(component['presentAlert']).toHaveBeenCalledWith(
      'Error',
      'Por favor, ingresa un correo válido.'
    );
  });

});
