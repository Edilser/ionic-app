import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosCaminoPageRoutingModule } from './envios-camino-routing.module';

import { EnviosCaminoPage } from './envios-camino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosCaminoPageRoutingModule
  ],
  declarations: [EnviosCaminoPage]
})
export class EnviosCaminoPageModule {}
