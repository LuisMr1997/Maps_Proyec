import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'; //Importación de la clase Provider para la asignación de usuarios por email y contraseña.

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Variable miembro 'user' que contendrá el email y contraseña del usuario.
  user = { email: '', password: '' };

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider
  ) {

  }

  //Function signin for user
  signin() {
    this.auth.registerUser(this.user.email, this.user.password) //Llamada al método registerUser. 
      .then((user) => {
        //El usuario se ha creado correctamante
        let alert = this.alertCtrl.create({
          title: 'Validación de cuenta',
          subTitle: 'Te has registrado correctamente',
          buttons: ['OK']
        });
        alert.present();
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }

  //Función para el inicio de sesión de los usuarios autenticados de manera correcta.
  login() {
    this.auth.loginUser(this.user.email, this.user.password) //Llamado al método loginUser de authProvider.
      .then((user) => {
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
  }

}
