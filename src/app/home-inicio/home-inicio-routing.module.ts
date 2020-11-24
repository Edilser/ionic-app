import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeInicioPage } from './home-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: HomeInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeInicioPageRoutingModule {}
