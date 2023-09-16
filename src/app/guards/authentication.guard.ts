import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
      return await this.checkAuth();
    }  
    
    private async checkAuth() {
      const authed = await this.authService.isAuthenticated();
      return authed || this.routeToLogin();
    }
  
    private routeToLogin(): boolean {
      this.navCtrl.navigateRoot('/login');
      return false;
    }
  
}
