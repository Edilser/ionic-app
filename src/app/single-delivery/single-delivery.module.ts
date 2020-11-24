import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleDeliveryPageRoutingModule } from './single-delivery-routing.module';

import { SingleDeliveryPage } from './single-delivery.page';
import { MenuComponent } from '../components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleDeliveryPageRoutingModule
  ],
  declarations: [SingleDeliveryPage, MenuComponent]
})
export class SingleDeliveryPageModule {}
