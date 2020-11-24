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
  selector: 'app-home-delivery2',
  templateUrl: './home-delivery2.page.html',
  styleUrls: ['./home-delivery2.page.scss'],
})
export class HomeDelivery2Page implements OnInit {
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
  data: any;
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

    this.TotalShipment = true;
    this.ShipmentsToday as Observable<any[]>;
    this.ShipmentsTomorrow as Observable<any[]>;
    this.data = window.location.href;
    this.business_key = this.data.split('/')[5];
    this.uid = this.data.split('/')[4];

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ShipmentsToday = [];
    this.ShipmentsTomorrow = [];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var ddT = String(today.getDate() + 1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var todays = dd + '-' + mm + '-' + yyyy;
    var tomorrow = ddT + '-' + mm + '-' + yyyy;
    this.rDB.database.ref(`${this.business_key}/Envios`).on('child_added', async (snap) => {
      var conj = [];
      var datos = snap.val();
      var key = snap.key;
      if (datos.estado !== 'completado' && datos.uid_user === this.uid) {
        conj.push(datos);
        await conj.map((al) => {
          this.DateExtract = al.fecha_time_salida;
          var comp = this.DateExtract.substr(0, 10).toString();
          if (comp === todays) {
            this.ShipmentsToday.push({ key: key, ...datos });
          } else if (comp === tomorrow) {
            this.ShipmentsTomorrow.push({ key: key, ...datos });
          }
        });
      }
    });

  }
}
