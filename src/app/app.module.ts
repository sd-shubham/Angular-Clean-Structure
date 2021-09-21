import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { APP_TOKEN_LOCAL_STORAGE_KEY } from './shared/model/common.model';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
export function tokenGetter() {
  return localStorage.getItem(APP_TOKEN_LOCAL_STORAGE_KEY);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.domain],
        disallowedRoutes: [environment.apiBaseUrl],
      },
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadMenus,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function loadMenus(authService: AuthService) {
  return () => authService.loadMenus();
}
