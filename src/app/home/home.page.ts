import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public uid: string;
  public perfilurl: string;
  public enviosurl: string;
  public homeurl: string;
  constructor(public router: Router, public route: ActivatedRoute, public authservice: AuthService, private menu: MenuController) {
    this.uid = this.route.snapshot.params.uid_user;
    this.homeurl = `home-inicio/${this.uid}`;
  }

  perfil() {
    this.perfilurl = `perfil/${this.uid}`;
  }

  envios() {
    this.enviosurl = `envios/${this.uid}`;
  }

  home() {
    this.homeurl = `home-inicio/${this.uid}`;
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
}
