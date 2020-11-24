import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesDeCuentaPage } from './ajustes-de-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesDeCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesDeCuentaPageRoutingModule {}
