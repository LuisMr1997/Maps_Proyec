import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  //Declaración de variables globales
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    //Seteo e instancias de los parámetros de ubicación y autocompletado.
    this.geocoder = new google.maps.Geocoder; //Instancia del geocodificador obtenido de la biblioteca de google maps para buscar lugares por (id).
    let elem = document.createElement("div");
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService(); //Instancia del servicio Google AutoComplete
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.loading = this.loadingCtrl.create(); 
  }

  /** Método el cual recibirá una solicitud al servicio GoogleAutocomplete
   *  para pedir predicciones basadas en la entradas o datos ingresados por el usuario */
  updateSearchResults() {
    if (this.autocomplete == '') {
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

  /** Método para obtener lugares cercanos a una distancia o radio declarado en el mismo */
  selectSearchResult(item) {
    this.autocompleteItems = [];
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          types: ['resturant'], //Obtenido de https://developers.google.com/places/web-service/supported_types
          key: 'AIzaSyBJlxSQZdq2PTHA7BYQp-KeBU8nUONg0r8',
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = []; 
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            this.loading.dismiss();
          });
        })
      }
    })
  }

  /** ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  } */

}
