import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil-delivery',
  templateUrl: './perfil-delivery.page.html',
  styleUrls: ['./perfil-delivery.page.scss'],
})
export class PerfilDeliveryPage implements OnInit {
  public uid: string;
  public name_user: string;
  public a: boolean = true;
  public im: string = '';
  public file: any;
  public ext: any;
  public metadata: any;
  constructor(
    public loadingController: LoadingController,
    public storage: AngularFireStorage,
    public firebase: AngularFireDatabase,
    public router: Router,
    public route: ActivatedRoute,
    public authservice: AuthService,
    private menu: MenuController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.uid = this.route.snapshot.params.uid_user;
    this.im = '../../assets/icon/profile-picture1.png';
    /*this.storage.ref(`AppImage/${this.uid}`).getDownloadURL().subscribe(url => {
      this.im = url
    }, error => {
      this.im = '../../assets/icon/profile-picture1.png';
    });*/
    this.firebase.database.ref(`-MBBux3LXNQi1rURDdNn/Repartidor/${this.uid}`).once('value', (snap) => {
      const datos = snap.val();
      this.name_user = datos.rep_user;
      this.im = datos.imagenPerfil;
    });
    this.presentLoadingWithOptions();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando ...',
      duration: 500,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  Onlogout() {
    this.authservice.logout();
  }
  ajustes() {
    this.router.navigate([`/ajustes-de-cuenta/${this.uid}`]);
  }
}
