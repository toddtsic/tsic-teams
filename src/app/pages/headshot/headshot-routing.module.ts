import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadshotPage } from './headshot.page';

const routes: Routes = [
  {
    path: '',
    component: HeadshotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeadshotPageRoutingModule {}
