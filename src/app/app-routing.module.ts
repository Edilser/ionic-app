import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';
import { DeliveyGuard } from './guards/delivey.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home/:uid_user',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [NologinGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterPageModule),
    canActivate: [NologinGuard],
  },
  {
    path: 'home-delivery',
    loadChildren: () => import('./home-delivery/home-delivery.module').then((m) => m.HomeDeliveryPageModule),
    canActivate: [DeliveyGuard],
  },
  {
    path: 'home-delivery/:uid/:bussiness_key',
    loadChildren: () => import('./home-delivery/home-delivery.module').then((m) => m.HomeDeliveryPageModule),
    canActivate: [DeliveyGuard],
  },
  {
    path: 'single-delivery',
    loadChildren: () => import('./single-delivery/single-delivery.module').then((m) => m.SingleDeliveryPageModule),
  },
  {
    path: 'single-delivery/:id_shipping/:bussiness_key',
    loadChildren: () => import('./single-delivery/single-delivery.module').then((m) => m.SingleDeliveryPageModule),
    canActivate: [DeliveyGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
  },
  {
    path: 'perfil/:uid_user',
    loadChildren: () => import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
  },
  {
    path: 'centro-ayuda',
    loadChildren: () => import('./centro-ayuda/centro-ayuda.module').then((m) => m.CentroAyudaPageModule),
  },
  {
    path: 'guia',
    loadChildren: () => import('./guia/guia.module').then((m) => m.GuiaPageModule),
  },
  {
    path: 'ajustes-de-cuenta',
    loadChildren: () => import('./ajustes-de-cuenta/ajustes-de-cuenta.module').then((m) => m.AjustesDeCuentaPageModule),
  },
  {
    path: 'ajustes-de-cuenta/:uid_user',
    loadChildren: () => import('./ajustes-de-cuenta/ajustes-de-cuenta.module').then((m) => m.AjustesDeCuentaPageModule),
  },
  {
    path: 'crear-envio',
    loadChildren: () => import('./crear-envio/crear-envio.module').then((m) => m.CrearEnvioPageModule),
  },
  {
    path: 'crear-envio/:uid_user',
    loadChildren: () => import('./crear-envio/crear-envio.module').then((m) => m.CrearEnvioPageModule),
  },
  {
    path: 'crear-envio/:uid_user/:tipoVehicle',
    loadChildren: () => import('./crear-envio/crear-envio.module').then((m) => m.CrearEnvioPageModule),
  },
  {
    path: 'perfil-delivery',
    loadChildren: () => import('./perfil-delivery/perfil-delivery.module').then((m) => m.PerfilDeliveryPageModule),
  },
  {
    path: 'perfil-delivery/:uid_user',
    loadChildren: () => import('./perfil-delivery/perfil-delivery.module').then((m) => m.PerfilDeliveryPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
