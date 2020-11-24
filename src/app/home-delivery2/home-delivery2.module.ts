import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDelivery2PageRoutingModule } from './home-delivery2-routing.module';

import { HomeDelivery2Page } from './home-delivery2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDelivery2PageRoutingModule
  ],
  declarations: [HomeDelivery2Page]
})
export class HomeDelivery2PageModule {}
