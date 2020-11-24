import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilDeliveryPage } from './perfil-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilDeliveryPageRoutingModule {}
