import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
// import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
// import { ImageShellComponent } from './image-shell/image-shell.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    ShowHidePasswordComponent,
    // AspectRatioComponent,
    // ImageShellComponent
  ],
  exports: [
    ShowHidePasswordComponent,
    // AspectRatioComponent,
    // ImageShellComponent
  ]
})
export class ComponentsModule {}
