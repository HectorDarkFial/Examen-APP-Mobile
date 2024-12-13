import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { app } from '../../environments/credenciales'; // Asegúrate de que esta ruta sea correcta

const auth = getAuth(app);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  // Inicio de sesión
  async logueo() {
    try {
      await signInWithEmailAndPassword(auth, this.email, this.password);
      this.presentAlert('Éxito', 'Inicio de sesión exitoso');
      this.navCtrl.navigateRoot('/home'); // Redirige al home.page
    } catch (error: any) {
      this.handleLoginError(error);
    }
  }

  // Restablecimiento de contraseña
  async handlePasswordReset() {
    if (!this.email) {
      this.presentAlert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, this.email);
      this.presentAlert('Éxito', 'Se ha enviado un enlace de restablecimiento a tu correo.');
    } catch (error) {
      this.presentAlert('Error', 'No se pudo enviar el correo. Inténtalo nuevamente.');
    }
  }

  // Manejo de errores de inicio de sesión
  handleLoginError(error: any) {
    let errorMessage = '';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'El correo ingresado no está registrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'La contraseña es incorrecta.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo es inválido.';
        break;
      default:
        errorMessage = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
        console.error('Error no manejado:', error);
        break;
    }
    this.presentAlert('Error', errorMessage);
  }

  // Alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  

  register() {
    // Aquí puedes agregar la lógica para redirigir al usuario a la página de registro
    console.log('Registro clickeado');
    // Redirección a la página de registro
    this.navCtrl.navigateForward('/register');
  }
}

