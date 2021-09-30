import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClient } from '../../../shared/helper/http-client.service';
@Injectable()
export class DashboardService {
  constructor(private readonly http: AppHttpClient) {}
  getUserList(): Observable<any> {
    return this.http.get('user');
  }
}
