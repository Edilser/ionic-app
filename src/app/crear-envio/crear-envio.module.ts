import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEnvioPageRoutingModule } from './crear-envio-routing.module';
import { CrearEnvioPage } from './crear-envio.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearEnvioPageRoutingModule
  ],
  declarations: [CrearEnvioPage]
})
export class CrearEnvioPageModule {}
