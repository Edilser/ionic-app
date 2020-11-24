import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-inicio',
  templateUrl: './home-inicio.page.html',
  styleUrls: ['./home-inicio.page.scss'],
})
export class HomeInicioPage implements OnInit {
  public uid: string;
  public urlenvios: string;
  constructor(private router: Router, public authservice: AuthService, private menu: MenuController, public route: ActivatedRoute) {
    this.uid = this.route.snapshot.params.uid_user;
    if (this.uid === undefined){
      //this.uid = this.route.snapshot._urlSegment.segments[1].path;
    }
    this.urlenvios = `/crear-envio/${this.uid}`; 
  }

  ngOnInit() {}

  Onlogout() {
    this.authservice.logout();
  }
}
