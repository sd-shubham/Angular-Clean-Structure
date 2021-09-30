import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from './components/dashboard.component';
import { dashboardRoutes } from './dashboard-routing.config';
import { DashboardService } from './service/dashboard-service';
@NgModule({
  declarations: [DashBoardComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
  providers: [DashboardService],
})
export class DashBoardModule {}
