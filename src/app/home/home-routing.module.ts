import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'home-inicio',
        children: [
          {
            path: '',
            loadChildren: () => import('../home-inicio/home-inicio.module').then((m) => m.HomeInicioPageModule),
          },
        ],
      },
      {
        path: 'home-inicio/:uid_user', 
        children: [
          {
            path: '',
            loadChildren: () => import('../home-inicio/home-inicio.module').then((m) => m.HomeInicioPageModule),
          },
        ],
      },
      {
        path: 'envios',
        children: [
          {
            path: '',
            loadChildren: () => import('../envios/envios.module').then((m) => m.EnviosPageModule),
          },
        ],
      },
      {
        path: 'envios/:uid_user',
        children: [
          {
            path: '',
            loadChildren: () => import('../envios/envios.module').then((m) => m.EnviosPageModule),
          },
        ],
      },
      {
        path: 'perfil/:uid_user',
        children: [
          {
            path: '',
            loadChildren: () => import('../perfil/perfil.module').then((m) => m.PerfilPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'tabs/home-inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home-inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
