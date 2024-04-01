import { Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonSpinner, LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingController: LoadingController){}

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  //----------------LOADING-----------------
  loading() {
    return this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      message: 'Loading',
      duration: 3000,
    });
 }

  //--------------TOAST--------------------
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //-------------RUTA A PAGINA DISPONIBLE-----------
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }


  //------GUARDAR ELEMENTO EN LOCAL STORAGE-----------
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  //-----OBTENER ELEMENTO DESDE LOCAL STORAGE---------
  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }
}
