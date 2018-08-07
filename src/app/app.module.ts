import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

/** Importación del servicio de GoogleMaps **/
import { Geolocation } from '@ionic-native/geolocation';

/** Importación y declaración de los módulos AngularFireModule, 
AngularFireDatabaseModule y AngularFireAuthModule de Firebase **/

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

//Datos otenidos de la consola de Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyB2NmmUu6cu7u4EXuLAkrS8g-EcdoD1y7U",
  authDomain: "yavi-maps.firebaseapp.com",
  databaseURL: "https://yavi-maps.firebaseio.com",
  projectId: "yavi-maps",
  storageBucket: "yavi-maps.appspot.com",
  messagingSenderId: "69108868387"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
