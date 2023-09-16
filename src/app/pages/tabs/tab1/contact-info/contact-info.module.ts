import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactInfoPageRoutingModule } from './contact-info-routing.module';

import { ContactInfoPage } from './contact-info.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactInfoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContactInfoPage]
})
export class ContactInfoPageModule {}
