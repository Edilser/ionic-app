import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { once } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, private router: Router, private rDB: AngularFireDatabase){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AFauth.authState.pipe(map( auth => {
        if (auth === null || auth === undefined) {
          this.router.navigate(['/login']);
          return false;
        } else {
          this.rDB.database
            .ref('Super/Empresas-Administradores/')
            .orderByChild('uid_admin')
            .equalTo(auth.uid)
            .once('child_added', (snap) => {
              const data = snap.val();
              if (data !== null || data !== undefined) {
                this.rDB.database.ref(data.llave_emp + '/Repartidor/' + data.llave_admin).once('value', (snap2) => {
                  const data2 = snap2.val();
                  if (data2 !== null) {
                    this.router.navigate([`/home-delivery/${auth.uid}/${data.llave_emp}`]);
                    return false;
                  } else {
                    this.router.navigate([`/home/${auth.uid}`]);
                    return true;
                  }
                });
              }
            });
          this.rDB.database
              .ref('App/Clientes/')
              .orderByChild('email')
              .equalTo(auth.email)
              .once('child_added', snap => {
                const data = snap.val();
                if (data !== null || data !== undefined) {
                  this.router.navigate([`/home/${auth.uid}/tabs/home-inicio/${auth.uid}`]);
                }
              });
          return true;
        }
    }));
  }
}
