import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, pipe } from 'rxjs';
import { LoadingController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-envios',
  templateUrl: './envios.page.html',
  styleUrls: ['./envios.page.scss'],
})
export class EnviosPage implements OnInit {
  public uid:string;
  activeClass: boolean = false;
  activeClass2: boolean = true;
  origin: {} = {};
  destino: {} = {};
  directionsService = new google.maps.DirectionsService(); // obtener la ruta optima
  directionDisplay = new google.maps.DirectionsRenderer(); // dibujar la ruta optima
  public map = '';
  private email:string; 
  public ShipmentsCompletado:any = [];
  public ShipmentsProceso:any = [];
  constructor(private loadingCtrl: LoadingController, private router: Router, private route:ActivatedRoute, private rDB: AngularFireDatabase, ) {
  }
  ngOnInit() {
    this.ShipmentsCompletado as Observable<any[]>;
    this.ShipmentsProceso as Observable<any[]>;
    this.uid = this.route.snapshot.params.uid_user;
    this.rDB.database.ref(`App/Clientes/${this.uid}`).once('value', async snap => {
      const datos = snap.val();
      this.email = datos.email;
      await this.get_data();
    });
  }

  async ionViewDidEnter() {
    for (let a = 0; a < this.ShipmentsCompletado.length; a++){
      var mapT = `map${a}`;
      this.origin = {lat: this.ShipmentsCompletado[a].direccion_salida_lat, lng: this.ShipmentsCompletado[a].direccion_salida_lon};
      this.destino = {lat: this.ShipmentsCompletado[a].direccion_llegada_lat, lng: this.ShipmentsCompletado[a].direccion_llegada_lon};
      this.initmaps(mapT, { lat: 14.6263005, lng: -90.5275799 });
    }
    for (let a = 0; a < this.ShipmentsProceso.length; a++){
      var mapT = `mapp${a}`;
      this.origin = {lat: this.ShipmentsCompletado[a].direccion_salida_lat, lng: this.ShipmentsCompletado[a].direccion_salida_lon};
      this.destino = {lat: this.ShipmentsCompletado[a].direccion_llegada_lat, lng: this.ShipmentsCompletado[a].direccion_llegada_lon};
      this.initmaps(mapT, { lat: 14.6263005, lng: -90.5275799 });
    }

  }

  initmaps (div, center) {
    const mapEle: HTMLElement = document.getElementById(div);
    this.map = new google.maps.Map(mapEle, {
      center: center,
      zoom: 6,
    });
  }

  async loadMap2(div:string, origen, destino) {
    var divFin = `mapp${div}`
    const mapEle: HTMLElement = document.getElementById(divFin);
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12,
    });
    this.directionDisplay.setMap(this.map);
    await this.calculateRoute(origen, destino);
  }
  

  async loadMap(div:string, origen, destino) {
    var divFin = `map${div}`
    const mapEle: HTMLElement = document.getElementById(divFin);
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12,
    });
    this.directionDisplay.setMap(this.map);
    await this.calculateRoute(origen, destino);
    /*await google.maps.event.addListenerOnce(this.map, 'idle', async () => {
      mapEle.classList.add('show-map');
      await this.calculateRoute(origen, destino);
      loading.dismiss();
    });*/
  }

  async calculateRoute(origen, destino) {
    await this.directionsService.route(
      {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionDisplay.setDirections(response);
          /*let ruta = response.routes[0];
          for (let i = 0; i < ruta.legs.length; i++) {
           // console.log('distancia : ', ruta.legs[i].distance.text)
            //console.log('distancia : ', ruta.legs[i].duration.text)
          }*/
        } else {
          alert(' ruta no encontrada ');
        }
      }
    );
  }

  get_data(){
    this.ShipmentsCompletado = [];
    this.rDB.database
      .ref('-MBBux3LXNQi1rURDdNn/Envios')
      .orderByChild('email')
      .equalTo(this.email)
      .on('child_added', async (snap2) => {
        var datos = snap2.val();
        if ((datos.estado === 'completado') && (datos.email === this.email)) {
          this.rDB.database.ref(`-MBBux3LXNQi1rURDdNn/Repartidor/${datos.uid_user}`).once('value', snapR => {
            const nameR = snapR.val().rep_user;
            this.ShipmentsCompletado.push({ key: snap2.key, nameRep: nameR, ...datos });
          })
        } else if ((datos.estado === 'proceso') && (datos.email === this.email)) {
          this.rDB.database.ref(`-MBBux3LXNQi1rURDdNn/Repartidor/${datos.uid_user}`).once('value', snapR => {
            const nameR = snapR.val().rep_user;
            this.ShipmentsProceso.push({ key: snap2.key, nameRep: nameR, ...datos });
          }) 
        }
      });
  }

  clickTab(event: Event, tab: string) { 
    event.stopImmediatePropagation();
    if (tab === 'envios-camino') {
      this.activeClass2 = false;
      this.activeClass = true;
    } else if (tab === 'envios-pasados') {
      this.activeClass2 = true;
      this.activeClass = false;
    }
  }
}
