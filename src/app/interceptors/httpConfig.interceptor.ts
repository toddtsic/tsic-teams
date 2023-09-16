//httpConfig.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ErrorsService } from '../services/errors.service';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  currentLoading: any = null;

  constructor(
      private _StorageService: StorageService,
      private _router: Router,
      private _errorsService: ErrorsService,
      private _loadingController: LoadingController,
      private _authenticationService: AuthenticationService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const userSettings_Promise = this._StorageService.getUser_AuthSettings();

      return from(userSettings_Promise)
          .pipe(
              switchMap(userSettings => {
                  const transformedReq = request.clone({
                      headers: request.headers.set('Authorization', `bearer ${userSettings?.token}`)
                  })

                  if (transformedReq instanceof HttpRequest && !this.currentLoading) {
                      this.showLoader();
                  }

                  return next.handle(transformedReq)
                      .pipe(
                          map((event: HttpEvent<any>) => {                                
                              if (event instanceof HttpResponse) {
                                  this.hideLoader();
                              }
                              return event;
                          }),
                          catchError((error) => {
                              this.hideLoader();
                              this._router.navigate(['login']);
                              this._errorsService.handleError('warning', 'Network Error', 6000, 'top', error);
                              return throwError(()=>new Error(error));
                          })
                      );
              }));

  }

  showLoader() {
      this.currentLoading = this._loadingController.create(
          {
              message: ''
          }
      ).then((res) => {
          res.present();

          res.onDidDismiss().then((dis) => {
              // console.log('Loading dismissed!');
          });
      });
  }

  async hideLoader() {
      // this.loadingController.dismiss();

      // use catch to 'eat' Uncaught (in promise): overlay does not exist
      this._loadingController
          .dismiss()
          .catch((err) => {
              // return false;
          });

      this.currentLoading = null;

  }


}