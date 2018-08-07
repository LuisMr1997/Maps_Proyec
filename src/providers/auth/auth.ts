import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';


@Injectable()
export class AuthProvider {

  constructor(
    private fireAuth: AngularFireAuth,
    public alertCtrl: AlertController
  ) {
    console.log('Hello AuthProvider Provider');
  }

  //Función para el registro de usuarios
  registerUser(email: string, password: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        //El usuario se ha creado correctamente
      })
      .catch(err => Promise.reject(err))
  }
  
  //Método para la autenticación de usuarios con correo electrónico y contraseña
  loginUser(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password) //Autenticación con firebase
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
  }

  //Método para devolver la sesión a un usuario
  get Session() {
    return this.fireAuth.authState;
  }

  //Método para cerrar sesión
  logout() {
    this.fireAuth.auth.signOut().then(()=>{
      //La sesión se ha cerrado
    })
  }
}

