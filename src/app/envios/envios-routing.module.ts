import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnviosPage } from './envios.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosPage,
  },
  {
    path: 'envios-camino',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'envios-pasados',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosPageRoutingModule {}
