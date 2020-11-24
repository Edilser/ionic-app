import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosPasadosPageRoutingModule } from './envios-pasados-routing.module';

import { EnviosPasadosPage } from './envios-pasados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosPasadosPageRoutingModule
  ],
  declarations: [EnviosPasadosPage]
})
export class EnviosPasadosPageModule {}
