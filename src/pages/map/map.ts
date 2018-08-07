import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;

  //Declaración de variables globales
  map: any; //Variable para la asignación del servicio de GoogleMap. 
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  loading: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider) { /** Inyección del AuthProvider */
    //Seteo e instancias de los parámetros de ubicación y autocompletado.
    this.geocoder = new google.maps.Geocoder; //Instancia del geocodificador obtenido de la biblioteca de google maps para buscar lugares por (id).
    this.markers = []; 
    let elem = document.createElement("div");
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService(); //Instancia del servicio Google AutoComplete
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.loading = this.loadingCtrl.create(); 
  }

  //Inicialización del mapa con coordenadas sujetas a selección del usuario. 
  ionViewDidEnter() {
    //Longitud y altitud de cualquier lugar establecido.
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 17
    });
  }

  /** Método el cual recibirá una solicitud al servicio GoogleAutocomplete
   *  para pedir predicciones basadas en la entradas o datos ingresados por el usuario */
  updateSearchResults() {
    if(this.autocomplete == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  /** Método para centrar el mapa y mostrar un marcador de lugar seleccionado 
   * cuando un usuario haya seleccionado un elemento de la lista de lugares de predicción */
  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]) {
        //let position = {
        //  lat: results[0].geometry.location.lat,
        //  lng: results[0].geometry.location.lng
        //};
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }

  /** Método para acceder a la ubicación actual de un usuario, utilizando el complemento Geolocation de ionic/Cordova */
  /** El método interior del mismo "getCurrentPosition" obtendrá la latitud y longitud 
   * de la posición del usuario para crear un pin o marcador y situarlo hasta el lugar correcto */
  tryGeolocation(){
    this.clearMarkers();
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Estás aquí mathafaka'
      });
      this.markers.push(marker);
      this.map.setCenter(pos);
    }).catch((error) => {
      console.log('Error al obtener tu posición actual', error);
    });
  }

  /** Método para recorrer los puntos o marcadores del mapa */
  clearMarkers() {
    for (var i=0; i<this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

   //Método para cerrar la sesión del usuario activo
   logoutSession() {
    this.auth.logout(); //Llamado a la función logout del provider creado
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MapPage');
  }

}
