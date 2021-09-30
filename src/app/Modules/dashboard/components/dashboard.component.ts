import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardService } from '../service/dashboard-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashBoardComponent implements OnInit {
  constructor(private readonly dashboardService: DashboardService) {}
  ngOnInit() {
    this.dashboardService.getUserList().subscribe((result) => {
      console.log(result);
    });
  }
}
