import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public uid: string;
  public name_user:string;
  public a:boolean = true;
  public im:string = '';
  public file:any;
  public ext:any;
  public metadata:any;
  constructor(public loadingController: LoadingController, public storage:AngularFireStorage, public firebase:AngularFireDatabase,public router:Router, public route: ActivatedRoute, public authservice: AuthService, private menu: MenuController) {
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.uid = this.route.snapshot.params.uid_user;
    this.im = '../../assets/icon/profile-picture1.png';
    /*this.storage.ref(`AppImage/${this.uid}`).getDownloadURL().subscribe(url => {
      this.im = url
    }, error => {
      this.im = '../../assets/icon/profile-picture1.png';
    });*/
    this.firebase.database.ref(`App/Clientes/${this.uid}`).once('value', snap => {
      const datos = snap.val();
      this.name_user = datos.nombre;
      if (datos.imagenPerfil === '') {
        this.im = '../../assets/icon/profile-picture1.png';
      } else {
        this.im = datos.imagenPerfil;
      }
    });
    this.presentLoadingWithOptions();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando ...',
      duration: 500
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