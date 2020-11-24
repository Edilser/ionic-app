import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosPasadosPage } from './envios-pasados.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosPasadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosPasadosPageRoutingModule {}
