import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { homeRoutes } from './home-routing.config';
import { AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    AccordionModule.forRoot(),
  ],
})
export class HomeModule {}
