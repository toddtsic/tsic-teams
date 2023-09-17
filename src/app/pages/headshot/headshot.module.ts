import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeadshotPage } from './headshot.page';
import { HeadshotPageRoutingModule } from './headshot-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HeadshotPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    HeadshotPage
  ]
})
export class HeadshotPageModule {}
