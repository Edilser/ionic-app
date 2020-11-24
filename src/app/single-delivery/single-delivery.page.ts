import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ToastController, Platform, LoadingController, AlertController  } from '@ionic/angular';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import {Router} from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}

@Component({
  selector: 'app-single-delivery',
  templateUrl: './single-delivery.page.html',
  styleUrls: ['./single-delivery.page.scss'],
})
export class SingleDeliveryPage implements OnInit {
  save: string;
  map: any;
  latStart: string;
  lngEnd: string;
  lat2Start: string;
  lng2End: string;
  cliente: string;
  Dorigen: string;
  Ddestino: string;
  time: string;
  stateya: boolean = true;
  statefin: boolean = false;
  stateShipment: string;
  class_show: any;
  disableBtn1: any;
  disableBtn2: any;
  class_card_modify: any;
  yaLlegue: any;
  finalizarViaje: any;
  //vec: any;
  directionsService = new google.maps.DirectionsService(); // obtener la ruta optima
  directionDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: this.map,
    panel: document.getElementById('indicators'),
  }); // dibujar la ruta optima

  origin = {};
  destination = {};
  public business_key: string;
  public keyShipment: string;
  public uid_user: string;
  //public vec: Observable<any[]>;
  public vec: any;
  public stateVerification: boolean = false;
  public buttonCancel: boolean = false;
  public numberCode: string;
  constructor(
    private loadingCtrl: LoadingController,
    private rDB: AngularFireDatabase,
    public route: ActivatedRoute,
    public alertController: AlertController,
    public router: Router,
    private geolocation: Geolocation
  ) {
    this.class_show = 'hidden_data';
    this.keyShipment = this.route.snapshot.params.id_shipping;
    this.business_key = this.route.snapshot.params.bussiness_key;

    this.rDB.database.ref(`${this.business_key}/Envios/${this.keyShipment}`).once('value', (snap) => {
      var datos = snap.val();
      this.origin = { lat: datos.direccion_salida_lat, lng: datos.direccion_salida_lon };
      this.destination = { lat: datos.direccion_llegada_lat, lng: datos.direccion_llegada_lon };
      this.cliente = datos.nombre_desti;
      this.Dorigen = datos.direccion_salida_exact;
      this.Ddestino = datos.direccion_llegada_exact;
      this.time = datos.fecha_time_llegada.substr(11, 16);
      this.stateShipment = datos.estado;
      this.numberCode = datos.digitos_valid;
      this.uid_user = datos.uid_user;
      this.vec = datos;
      this.yaLlegue = datos.f_ya_llegue;
      this.finalizarViaje = datos.f_completar;
    });
    this.rDB.database.ref(`${this.business_key}/Envios`).once('child_changed', (snap) => {
      var datos = snap.val();
      this.origin = { lat: datos.direccion_salida_lat, lng: datos.direccion_salida_lon };
      this.destination = { lat: datos.direccion_llegada_lat, lng: datos.direccion_llegada_lon };
      this.cliente = datos.nombre_desti;
      this.Dorigen = datos.direccion_salida_exact;
      this.Ddestino = datos.direccion_llegada_exact;
      this.time = datos.fecha_time_llegada.substr(11, 16);
      this.stateShipment = datos.estado;
      this.yaLlegue = datos.f_ya_llegue;
      this.finalizarViaje = datos.f_completar;
      this.uid_user = datos.uid_user;
      this.vec = datos;
    });

    if (this.stateShipment === 'proceso') {
      this.class_show = 'second_step';
    } else if (this.stateShipment === 'pendiente') {
      this.class_card_modify = '';
    }

    if (this.yaLlegue !== '') {
      this.disableBtn1 = true;
      this.disableBtn2 = false;
    } else {
      this.disableBtn1 = false;
      this.disableBtn2 = true;
    }

    /*this.vec = this.rDB
        .list(this.business_key + '/Envios/'+this.keyShipment)
        .valueChanges();
      this.vec.forEach(d => {
        this.origin = {lat: d[6], lng: d[7]};
        this.destination = {lat: d[3], lng: d[4]};
        this.cliente = d[17];
        this.Dorigen = d[5];
        this.Ddestino = d[2];
        if (d[14] !== undefined) {
          this.time = d[14].substr(11,16);
          localStorage.setItem('time',this.time);
        } else {
          this.time = localStorage.getItem('time');
        }
        
        this.stateShipment = d[8];
        console.log('edilser');
      })*/
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const mapEle: HTMLElement = document.getElementById('map_canvas');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');

    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12,
    });

    this.directionDisplay.setMap(this.map);
    this.directionDisplay.setPanel(indicatorsEle);
    /* this.directionDisplay.addListener('directions_changed', function () {
      this.computeTotalDistance(this.directionDisplay.getDirections());
    });*/
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
      loading.dismiss();
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    });
  }
  private datenow() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var ddT = String(today.getDate() + 1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  }

  async ShipmentProcess(keyShipment) {
    this.class_show = 'second_step';
    this.rDB.database
      .ref(this.business_key + '/Envios/' + keyShipment + '/estado')
      .set('proceso')
      .then(() => {
        this.rDB.database.ref(this.business_key + '/Envios/' + keyShipment + '/f_iniciar_viaje').set(this.datenow());
      });
    /*this.vec.forEach(d => {
      newData = {
        comentario : d[0], digitos_valid : d[1],
        direccion_llegada_exact : d[2], direccion_llegada_lat : d[3],
        direccion_llegada_lon : d[4], direccion_salida_exact : d[5], 
        direccion_salida_lat : d[6], direccion_salida_lon : d[7],
        estado : 'proceso', f_cancelar_envio : d[9], 
        f_completar : d[10], f_iniciar_viaje : todays, 
        f_verificar : d[12], f_ya_llegue : d[13], 
        fecha_time_llegada : d[14], fecha_time_salida : d[15], 
        id_repartidor_vehiculo : d[16], nombre_desti : d[17], 
        notas_generales : d[18], notas_llegada : d[19], 
        notas_salida : d[20], product_enviar : d[21], 
        qr_valir : d[22], telefono : d[23],
        tipo_paquete : d[24], uid_user : d[25]
      }
    })
    actualizar[this.business_key+'/Envios/'+keyShipment] = newData;
    this.rDB.database.ref().update(actualizar);*/

    const alert = await this.alertController.create({
      cssClass: 'customcoloralert',
      header: 'Tu viaje está por iniciar',
      subHeader: '', 
      message: `<img src="../../assets/icon/inicar.png" class="card-alert"><br>¡Maneja con cuidado!`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public yallegue(keyShipment) {
    this.disableBtn1 = true;
    this.disableBtn2 = false;
    this.rDB.database.ref(this.business_key + '/Envios/' + keyShipment + '/f_ya_llegue').set(this.datenow());
    document.getElementById('llegue').setAttribute('class', 'botonsGreen md button button-solid ion-activatable ion-focusable hydrated');
  }

  async finalizar(keyShipment) {
    this.rDB.database.ref(this.business_key + '/Envios/' + keyShipment + '/f_completar').set(this.datenow());
    document.getElementById('cambio').setAttribute('class', 'botons2Green md button button-solid ion-activatable ion-focusable hydrated');
    const alert = await this.alertController.create({
      cssClass: 'customcoloralert',
      header: 'Código de verificacíon',
      message: 'Ingresa el código enviado para <br>confirmar que estas entregando el paquete a quién deberías',
      inputs: [
        {
          name: 'codigo',
          type: 'number',
          placeholder: 'Código',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.buttonCancel = true;
          },
        },
        {
          text: 'Confirmar',
          cssClass: 'codigo',
          handler: (res) => {
            if (res.codigo === this.numberCode) {
              this.stateShipment = 'content-null';
              this.stateVerification = true;
              this.rDB.database.ref(this.business_key + '/Envios/' + keyShipment + '/f_verificar').set(this.datenow());
              this.VerificacionCorrect();
            } else {
              this.stateVerification = false;
              this.VerificacionIncorrecta();
            }
          },
        },
      ],
    });

    await alert.present();
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
          this.directionDisplay.setDirections(response);
          let ruta = response.routes[0];
        } else {
          alert(' ruta no encontrada ');
        }
      }
    );
  }

  async VerificacionCorrect() {
    const alert = await this.alertController.create({
      cssClass: 'customcoloralert',
      header: 'La orden fue completada',
      subHeader: '',
      message: `<img src="../../assets/icon/success-delivery.png" class="card-alert">`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async VerificacionIncorrecta() {
    const alert = await this.alertController.create({
      cssClass: 'customcoloralert',
      header: 'Error',
      subHeader: '',
      message: 'El código de verificación es incorrecto',
      buttons: ['OK'],
    });

    await alert.present();
  }

  public completeShipment(keyShipment) {
    console.log(this.uid_user);
    console.log(this.business_key);
    this.rDB.database
      .ref(this.business_key + '/Envios/' + keyShipment + '/estado')
      .set('completado')
      .then(() => {
        if (this.save !== '') {
          this.rDB.database.ref(this.business_key + '/Envios/' + keyShipment + '/notas_generales').set(this.save);
        }
        this.router.navigate(['/home-delivery/' + this.uid_user + '/' + this.business_key]);
      });
  }

  public show_more() {
    console.log('asdfadsf');
    if (this.class_show === 'hidden_data') {
      this.class_show = 'show_data';
    } else {
      this.class_show = 'hidden_data';
    }
  }
}
