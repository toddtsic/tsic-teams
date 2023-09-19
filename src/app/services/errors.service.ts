import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) { }

  public handleError<T>(
    errorType:string, 
    header:string, 
    duration:number,
    position:"top"|"bottom"|"middle" | undefined, 
    result?: T
  ) {
    this.log(errorType, header, duration, position, result);
    return throwError(()=>new Error(header));
  }

  private async log(
    errorType:string, 
    header:string, 
    duration:number, 
    position:"top"|"bottom"|"middle" | undefined, 
    result?: any
  ) {
    debugger;
    let toast = null;

    switch (result.status){
      case 401:
        toast = await this.toastController.create({
          header: 'Unauthorized',
          message: 'You are not currently logged in.  Please login now.',
          position: position,
          color: errorType,
          duration: duration,
          cssClass: "custom-toaster"
        });
        break;
      default:
        if (result?.statusText === 'Bad Request' && result?.error?.message){
          toast = await this.toastController.create({
            header: 'Error',
            message: result?.error?.message,
            position: position,
            color: errorType,
            duration: duration,
            cssClass: "custom-toaster"
          });
        } else {
          toast = await this.toastController.create({
            header: header,
            message: result.message,
            position: position,
            color: errorType,
            duration: duration,
            cssClass: "custom-toaster"
          });  
        }    
        break;
    }

    if (toast){
      toast.present();
    }
  }
}
