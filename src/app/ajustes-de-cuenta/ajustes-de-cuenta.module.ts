import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesDeCuentaPageRoutingModule } from './ajustes-de-cuenta-routing.module';

import { AjustesDeCuentaPage } from './ajustes-de-cuenta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjustesDeCuentaPageRoutingModule
  ],
  declarations: [AjustesDeCuentaPage]
})
export class AjustesDeCuentaPageModule {}
