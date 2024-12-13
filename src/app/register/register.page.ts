import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../environments/credenciales';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordFocused: boolean = false;
  loading: boolean = false;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  async handleCreateAccount() {
    if (!this.isEmailValid(this.email)) {
      this.presentAlert('Error', 'Por favor, ingresa un correo válido.');
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.presentAlert(
        'Error',
        'La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, un número y un símbolo.'
      );
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    this.loading = true;
    try {
      await createUserWithEmailAndPassword(auth, this.email, this.password);
      this.presentAlert(
        'Éxito',
        'Tu cuenta ha sido creada exitosamente.',
        () => {
          // Aquí puedes agregar la lógica de redirección
        }
      );
    } catch (error: any) {
      this.presentAlert('Error al crear cuenta', this.getErrorMessage(error.code));
    } finally {
      this.loading = false;
    }
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasNumber && hasUpperCase && hasSpecialChar;
  }

  async presentAlert(header: string, message: string, callback?: () => void) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Aceptar',
          handler: callback,
        },
      ],
    });
    await alert.present();
  }

  
  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      default:
        return 'Ocurrió un error inesperado.';
    }
  }
  
  login() {
    // Aquí puedes agregar la lógica para redirigir al usuario a la página de registro
    console.log('Registro clickeado');
    // Redirección a la página de registro
    this.navCtrl.navigateForward('/login');
  }


}
