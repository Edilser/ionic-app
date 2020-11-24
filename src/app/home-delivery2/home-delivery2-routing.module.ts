import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDelivery2Page } from './home-delivery2.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDelivery2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDelivery2PageRoutingModule {}
