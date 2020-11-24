import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { sendingData } from '../models/test.interface';
import { AngularFireList } from 'angularfire2/database';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
@Component({
  selector: 'app-home-delivery',
  templateUrl: './home-delivery.page.html',
  styleUrls: ['./home-delivery.page.scss'],
})
export class HomeDeliveryPage {
  public uid: string;
  public fecha: string;
  public fechaT: string;
  public DateExtract: string;
  public data_shipments: any = [];
  public ShipmentsToday: any = [];
  public ShipmentsTomorrow: any = [];
  public totalShip: any = [];
  public NoShipment = 0;
  public TotalShipment: boolean;
  // tslint:disable-next-line: variable-name
  public business_key: string;
  public groups: Observable<any[]>;
  public test: any;
  public perfilurl: string;
  // tslint:disable-next-line: variable-name
  //public data_shipments: Observable<any[]>;

  constructor(
    public authservice: AuthService,
    private menu: MenuController,
    private rDB: AngularFireDatabase,
    public route: ActivatedRoute,
    public platform: Platform
  ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var ddT = String(today.getDate() + 1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todays = dd + '-' + mm + '-' + yyyy;
    var tomorrow = ddT + '-' + mm + '-' + yyyy;
    moment.locale('es');
    this.fecha = 'Hoy, ' + moment().format('dddd') + ' ' + String(today.getDate()).padStart(2, '0');
    this.fechaT = 'Mañana, ' + moment().add(1, 'days').format('dddd') + ' ' + String(today.getDate() + 1).padStart(2, '0');
    this.uid = this.route.snapshot.params.uid;
    this.business_key = this.route.snapshot.params.bussiness_key;
    // this.groups = this.rDB.list(this.business_key + '/Envios', (ref) => ref.orderByChild('fecha_time_salida')).valueChanges();

    /*this.data_shipments = this.rDB
      .list(this.business_key + '/Envios', (ref) => ref.orderByChild('uid_user').equalTo(this.uid))
      .snapshotChanges()
      .pipe(map((changes) => changes.map((change) => ({ key: change.payload.key, ...(change.payload.val() as Observable<any[]>) }))));*/

    /*this.rDB.database.ref(`${this.business_key}/Envios`).on('child_added', async snap => {
        console.log('entre al total');
        var conj = [];
        var datos = snap.val();
        var key = snap.key;
        conj.push(datos);
        await conj.map(al => {
          this.DateExtract = al.fecha_time_salida;
          var comp = this.DateExtract.substr(0,10).toString();
          if (comp === todays) {
            console.log('aca');
            this.ShipmentsToday.push(({key: key, ...(datos)}));
          } else if (comp == tomorrow) {
            this.ShipmentsTomorrow.push(({key: key, ...(datos)}));
          }
        })
      })*/

    /*this.rDB.database.ref(this.business_key+'/Envios/').on('child_added', snap => {
        var conj = [];
        var datos = snap.val();
        var key = snap.key;
        conj.push(datos);
        conj.map(al => {
          this.DateExtract = al.fecha_time_salida;
          var comp = this.DateExtract.substr(0,10).toString();
          console.log('comp => ', comp);
          console.log('todays => ', todays);
          if (comp === todays) {
            this.ShipmentsToday.push(datos);
          } else if (comp == tomorrow) {
            this.ShipmentsTomorrow.push(datos);
          }
        })
      })

    this.data_shipments.forEach(data => {
      data.forEach(datos => {
        this.DateExtract = datos.fecha_time_salida;
        var comp = this.DateExtract.substr(0,10).toString();
        if (comp == todays) {
          this.ShipmentsToday.push(datos);
        } else if (comp == tomorrow) {
          this.ShipmentsTomorrow.push(datos);
        }
      })
    });*/

    this.TotalShipment = true;
    this.ShipmentsToday as Observable<any[]>;
    this.ShipmentsTomorrow as Observable<any[]>;
  }

  OpenFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  OpenEnd() {
    this.menu.open('end');
  }
  OpenCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  Onlogout() {
    this.authservice.logout();
  }
  perfil() {
    this.perfilurl = `perfil/${this.uid}`;
  }
}
