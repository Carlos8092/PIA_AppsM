import { Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonSpinner, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { AddUpdateObjectComponent } from '../shared/components/add-update-object/add-update-object.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingController: LoadingController) { }

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  modalCtrl = inject(ModalController);

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
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }


  //------GUARDAR ELEMENTO EN LOCAL STORAGE-----------
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  //-----OBTENER ELEMENTO DESDE LOCAL STORAGE---------
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  //-----------MODAL----------
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      return data;
    }
  }

  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  //------TAKE PICTURE-------
  async takePicture (promptLabelHeader: string){
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Select image',
      promptLabelPicture: 'Take a picture',
      promptLabelCancel: 'Cancel'
    });
  };
}
