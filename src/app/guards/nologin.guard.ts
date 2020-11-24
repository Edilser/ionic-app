import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root',
})
export class NologinGuard implements CanActivate {
  constructor(private AFauth: AngularFireAuth, private router: Router, private rDB: AngularFireDatabase) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AFauth.authState.pipe(
      map((auth) => {
        if (auth === null || auth === undefined) {
          return true;
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
                  if (data2 !== null || data2 !== undefined) {
                    this.router.navigate(['/home-delivery']);
                    return false;
                  } else {
                    this.router.navigate(['/home']);
                    return false;
                  }
                });
              } else {
                this.router.navigate(['/home']);
                return false;
              }
            });
        }
      })
    );
  }
}
