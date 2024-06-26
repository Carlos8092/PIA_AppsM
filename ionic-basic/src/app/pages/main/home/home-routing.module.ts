import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FypPage } from '../fyp/fyp.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'fyp',
    component: FypPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}