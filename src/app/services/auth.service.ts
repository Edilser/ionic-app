import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private AFauth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => rejected(err));
    });
  }

  logout() {
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // tslint:disable-next-line: variable-name
  register(email_user: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.createUserWithEmailAndPassword(email_user, password)
        .then((res) => {
            resolve(res.user.uid);
        }).catch((err) => rejected);
    });
  }
}
