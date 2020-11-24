import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geocoder, GoogleMapsEvent } from '@ionic-native/google-maps';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

declare var google;
interface Marker {
  lat: number;
  lng: number;
  title: string;
}
 
@Component({
  selector: 'app-crear-envio',
  templateUrl: './crear-envio.page.html',
  styleUrls: ['./crear-envio.page.scss'],
})
export class CrearEnvioPage implements OnInit {
  // origin = { lat: 14.6263005, lng: -90.5275799 };
  // destination = { lat: 4.676802158355713, lng: -74.04825592041016 };

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private rDB: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController
  ) {
    this.show_position1 = false;
    this.show_position2 = true;
    this.show_btn1 = false;
    this.show_btn2 = true;
    this.show_btn3 = true;
    this.show_content_1 = true;
    this.show_content_2 = true;
    this.show_content_3 = true;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.autocomplete2 = { input: '' };
    this.autocompleteItems2 = [];
    this.uid = this.route.snapshot.params.uid_user;
    this.tipo = this.route.snapshot.params.tipoVehicle
    this.rDB.database.ref(`App/Clientes/${this.uid}`).once('value', (snap) => {
      const datos = snap.val();
      this.nameF = datos.nombre;
      this.phoneF = datos.telefono;
      this.emailF = datos.email;
    });
  }
  public tipo: string;
  public uid: string;
  public nameF: string;
  public phoneF: string;
  public nameFF: string;
  public phoneFF: string;
  public notasSalida: string;
  public notasEntrega: string;
  public emailF: string;
  private emailA: string;
  private password: string;
  public im: string;
  map: any;
  show_position1: any;
  show_position2: any;
  show_btn1: any;
  show_btn2: any;
  show_btn3: any;
  show_content_1: any;
  show_content_2: any;
  show_content_3: any;
  address: string;
  lat: string;
  long: string;
  origin: any;
  objeto_envio : any;
  destination: any;
  autocomplete: { input: string };
  autocomplete2: { input: string };
  autocompleteItems: any[];
  autocompleteItems2: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  get name() {
    return this.completeShipment.get('name');
  }
  get phone() {
    return this.completeShipment.get('phone');
  }
  get name2() {
    return this.completeShipment.get('name2');
  }
  get phone2() {
    return this.completeShipment.get('phone2');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'maxlength', message: 'EL nombre solo puede tener 100 caracteres.' },
      { type: 'pattern', message: 'El nombre unicamente debe contener letras' },
    ],
    phone: [
      { type: 'required', message: 'El número celular es requerido.' },
      { type: 'maxlength', message: 'El número celular solo tiene que tener 8 digitos.' },
      { type: 'pattern', message: 'Ingrese un número de celular correcto.' },
    ],
    name2: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'maxlength', message: 'EL nombre solo puede tener 100 caracteres.' },
      { type: 'pattern', message: 'El nombre unicamente debe contener letras' },
    ],
    phone2: [
      { type: 'required', message: 'El número celular es requerido.' },
      { type: 'maxlength', message: 'El número celular solo tiene que tener 8 digitos.' },
      { type: 'pattern', message: 'Ingrese un número de celular correcto.' },
    ],
  };

  completeShipment = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
    phone: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
    name2: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
    phone2: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]],
  });

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    // FIRST GET THE LOCATION FROM THE DEVICE.
    const loading = await this.loadingCtrl.create();
    await loading.present();
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: { lat: 14.6263005, lng: -90.5275799 },
      zoom: 12,
    });
    this.directionsDisplay.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.get_posicion_loading();
      loading.dismiss();
    });
  }
  get_posicion_loading() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapEle: HTMLElement = document.getElementById('map');
        this.map = new google.maps.Map(mapEle, {
          center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
          zoom: 15,
        });
        this.origin = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
          let mar = this.addMarker({
            lat: resp.coords.latitude,
            lng: resp.coords.longitude,
            title: 'mi ubicacion',
          });
          google.maps.event.addListener(mar, 'dragend', () => {
            this.getMarkerPosition(mar.getPosition(), 'origin');
          });
          this.autocomplete.input = 'Mi ubicación';
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  get_posicion() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapEle: HTMLElement = document.getElementById('map');
        this.origin = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        this.map = new google.maps.Map(mapEle, {
          center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
          zoom: 15,
        });
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
          let mar = this.addMarker({
            lat: resp.coords.latitude,
            lng: resp.coords.longitude,
            title: 'mi ubicacion',
          });
          google.maps.event.addListener(mar, 'dragend', () => {
            this.getMarkerPosition(mar.getPosition(), 'origin');
          });
        });
        this.autocomplete.input = 'Mi ubicación';
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  async get_posicion2() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapEle: HTMLElement = document.getElementById('map');
        this.destination = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        this.map = new google.maps.Map(mapEle, {
          center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
          zoom: 15,
        });
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
          let mar = this.addMarker({
            lat: resp.coords.latitude,
            lng: resp.coords.longitude,
            title: 'mi ubicacion',
          });
          google.maps.event.addListener(mar, 'dragend', () => {
            this.getMarkerPosition(mar.getPosition(), 'destination');
          });
          loading.dismiss();
        });
        this.autocomplete2.input = 'Mi ubicación';
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  }

  // AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
  UpdateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  UpdateSearchResults2() {
    if (this.autocomplete2.input === '') {
      this.autocompleteItems2 = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete2.input }, (predictions, status) => {
      this.autocompleteItems2 = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          console.log('pediccion ', prediction)
          this.autocompleteItems2.push(prediction);
        });
      });
    });
  }

  // wE CALL THIS FROM EACH ITEM.
  async SelectSearchResult(item) {
    this.show_btn1 = false;
    this.show_btn2 = true;
    this.show_btn3 = true;
    const info: any = await Geocoder.geocode({ address: item.description })
      .then((resp) => {
        this.origin = { lat: resp[0].position.lat, lng: resp[0].position.lng };
        const mapEle: HTMLElement = document.getElementById('map');
        this.map = new google.maps.Map(mapEle, {
          center: { lat: resp[0].position.lat, lng: resp[0].position.lng },
          zoom: 15,
        });
        //this.directionsDisplay.setMap(this.map);
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
          let mar = this.addMarker({
            lat: resp[0].position.lat,
            lng: resp[0].position.lng,
            title: 'mi ubicacion',
          });
          google.maps.event.addListener(mar, 'dragend', () => {
            this.getMarkerPosition(mar.getPosition(), 'origin');
          });
        });
      })
      .catch(() => {
        console.log('err');
      });
    this.autocomplete.input = item.description;
    this.autocompleteItems = [];
  }

  async SelectSearchResult2(item) {
    this.show_btn1 = true;
    this.show_btn2 = false;
    this.show_btn3 = true;
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const info: any = await Geocoder.geocode({ address: item.description })
      .then((resp) => {
        this.destination = { lat: resp[0].position.lat, lng: resp[0].position.lng };
        const mapEle: HTMLElement = document.getElementById('map');
        this.map = new google.maps.Map(mapEle, {
          center: { lat: resp[0].position.lat, lng: resp[0].position.lng },
          zoom: 15,
        });
        //this.directionsDisplay.setMap(this.map);
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
          let mar = this.addMarker({
            lat: resp[0].position.lat,
            lng: resp[0].position.lng,
            title: 'mi ubicacion',
          });
          google.maps.event.addListener(mar, 'dragend', () => {
            this.getMarkerPosition(mar.getPosition(), 'destination');
          });
          loading.dismiss();
          this.show_btn2 = false;
          this.show_btn3 = true;
        });
      })
      .catch(() => {
        console.log('err');
      });
    this.autocomplete2.input = item.description;
    this.autocompleteItems2 = [];
  }

  HacerEnvio() {
    if ((this.origin.lat === this.destination.lat) && (this.origin.lng === this.destination.lng)) {
      alert('La ubicación de salida y entrega son las mismas')
    } else {
      this.show_content_1 = true;
      this.show_content_2 = true;
      this.show_btn1 = true;
      this.show_btn2 = true;
      this.show_btn3 = true;
      this.show_content_3 = false;
    }
  }

  async ContinuarFinal() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var dia_salida = dd + '-' + mm + '-' + yyyy + ' ' + today.getHours() + ':' + today.getMinutes();
    if (this.completeShipment.valid) {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      if (this.notasSalida === undefined) this.notasSalida = ''
      if (this.notasEntrega === undefined) this.notasEntrega = ''
      this.objeto_envio = {
        solicitudVehicle : this.tipo,
        nombre_desti : this.nameFF,
        telefono : this.phoneFF,
        email: this.emailF,
        tipo_paquete : '',
        product_enviar : '',
        fecha_time_salida : dia_salida,
        fecha_time_llegada : '',
        qr_valid : '',
        digitos_valid : '',
        direccion_salida_lat : this.origin.lat,
        direccion_salida_lon : this.origin.lng,
        direccion_salida_exact : '',
        notas_salida : this.notasSalida,
        direccion_llegada_lat : this.destination.lat,
        direccion_llegada_lon : this.destination.lng,
        direccion_llegada_exact : '',
        notas_llegada : this.notasEntrega,
        notas_generales : '',
        id_repartidor_vehiculo :'',
        uid_user : '',
        estado : 'sin-asignar',
        orden : 4,
        comentario : ''
      }
      this.rDB.database.ref('-MBBux3LXNQi1rURDdNn/Envios').push(this.objeto_envio)
        .then(async () => {
          loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Envió creado exitosamente',
            duration: 2000
          });
          toast.present();
          this.router.navigate(['/home']);
        });
    } else {
      alert('faltan datos');
    }
  }
  // lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  ClearAutocomplete() {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  ClearAutocomplete2() {
    this.autocompleteItems2 = [];
    this.autocomplete2.input = '';
  }

  async ElegirUbicacionInicio() {
    this.show_position1 = false;
    this.show_position2 = false;
    this.show_btn1 = true;
    this.show_btn2 = false;
    this.show_content_1 = true;
    if (this.autocomplete2.input === '') {
      this.autocomplete2.input = '';
      this.destination = {};
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: { lat: 14.6263005, lng: -90.5275799 },
      zoom: 10,
    });
    this.directionsDisplay.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
      loading.dismiss();
    });
    if (this.origin !== undefined && this.destination.lat !== undefined) {
      this.ElegirUbicacionFinal();
    }
  }

  async ElegirUbicacionFinal() {
    this.show_content_2 = true;
    this.show_position1 = false;
    this.show_position2 = false;
    this.show_btn1 = true
    this.show_btn2 = false
    this.show_btn3 = true
    if ((this.origin.lat === this.destination.lat) && (this.origin.lng === this.destination.lng)) {
      alert('La ubicación de salida y entrega son las mismas')
    } else {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      // create a new map by passing HTMLElement
      const mapEle: HTMLElement = document.getElementById('map');
      // create map
      this.map = new google.maps.Map(mapEle, {
        center: { lat: 14.6263005, lng: -90.5275799 },
        zoom: 10,
      });
      this.directionsDisplay.setMap(this.map);
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        this.calculateRoute();
        loading.dismiss();
      });
      if (this.origin.lat !== undefined && this.destination.lat !== undefined) {
        this.show_btn1 = true;
        this.show_btn2 = true;
        this.show_btn3 = false;
      } else if (this.destination.lat === undefined) {
        alert('Ingresa tu ubicación de entrega')
      } 
    }
    
    
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: marker.title,
      draggable: true,
    });
    
  }

  getMarkerPosition(latlng, posicion) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      let address = results[0].formatted_address;
      Geocoder.geocode({ address: address }).then((resp) => {
        if (posicion === 'destination') {
          this.destination = { lat: resp[0].position.lat, lng: resp[0].position.lng };
        } else if (posicion === 'origin') {
          this.origin = { lat: resp[0].position.lat, lng: resp[0].position.lng };
        }
      });
    });
  }

  ShowFirstContent() {
    this.show_btn1 = false;
    this.show_btn2 = true;
    this.show_content_1 = false;
  }

  ShowSecondContent() {
    this.show_content_2 = false;
  }

  Elegirenelmapa() {
    this.show_content_1 = true;
    this.show_content_2 = true;
    this.show_content_3 = true;
  }

  Elegirenelmapa2() {
    this.get_posicion2();
    this.show_content_1 = true;
    this.show_content_2 = true;
    this.show_content_3 = true;
  }

  private calculateRoute() {
    this.directionsService.route(
      {
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      }
    );
  }
}
