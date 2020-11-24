import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilDeliveryPageRoutingModule } from './perfil-delivery-routing.module';

import { PerfilDeliveryPage } from './perfil-delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilDeliveryPageRoutingModule
  ],
  declarations: [PerfilDeliveryPage]
})
export class PerfilDeliveryPageModule {}
