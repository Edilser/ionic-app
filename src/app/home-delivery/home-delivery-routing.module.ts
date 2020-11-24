import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDeliveryPage } from './home-delivery.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomeDeliveryPage,
    children: [
      {
        path: 'home-delivery2',
        children: [
          {
            path: '',
            loadChildren: () => import('../home-delivery2/home-delivery2.module').then((m) => m.HomeDelivery2PageModule),
          },
        ],
      },
      /*{
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('../envios/envios-routing.module').then((m) => m.EnviosPageRoutingModule),
          },
        ],
      },*/
      {
        path: 'perfil/:uid_user',
        children: [
          {
            path: '',
            loadChildren: () => import('../perfil-delivery/perfil-delivery-routing.module').then((m) => m.PerfilDeliveryPageRoutingModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'tabs/home-delivery2',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home-delivery2',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDeliveryPageRoutingModule {}
