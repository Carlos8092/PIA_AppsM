import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActionSheetController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-update-object',
  templateUrl: './add-update-object.component.html',
  styleUrls: ['./add-update-object.component.scss'],
})
export class AddUpdateObjectComponent implements OnInit {

  @Input() product: Product;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    image: new FormControl("", [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    soldUnits: new FormControl(null, [Validators.required, Validators.min(0)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  actionSheetCtrl = inject(ActionSheetController);

  user = {} as user;

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.product) {
      this.form.setValue(this.product);
    }
  }

  //------OPTIONS TO SELECT IMAGE-------
  async optionsToSelectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'Select Image',
      buttons: [
        {
          text: 'Select image from gallery',
          handler: () => {
            this.selectImage();
          },
        },
        {
          text: 'Take a photo',
          handler: () => {
            this.takeImage();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  //------TAKE PHOTO-------
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture()).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  //-------SELECT IMAGE FROM GALLERY-----
  async selectImage() {
    const dataUrl = (await this.utilsSvc.selectPicture()).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  submit() {
    if (this.form.valid) {
      if (this.product) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    }
  }

  async createProduct() {


    let path = `users/${this.user.uid}/products`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    //------UPLOAD IMAGEN GET URL------
    let dataUrl = this.form.value.image;
    let imagePath = `${this.user.uid}/${Date.now()}`;
    let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
    this.form.controls.image.setValue(imageUrl);

    delete this.form.value.id;

    this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Product in sale',
        duration: 4000,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-done-outline'
      })

    }).catch(error => {

      console.log(error);

      this.utilsSvc.presentToast({
        message: 'Product have not posted yet',
        duration: 4000,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })

  }

  async updateProduct() {

    let path = `users/${this.user.uid}/products/${this.product.id}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    //------UPLOAD IMAGEN GET URL------

    if (this.form.value.image !== this.product.image) {

      let dataUrl = this.form.value.image;
      let imagePath = await this.firebaseSvc.getFilePath(this.product.image);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Update product',
        duration: 4000,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-done-outline'
      })

    }).catch(error => {

      console.log(error);

      this.utilsSvc.presentToast({
        message: 'Product have not update yet',
        duration: 4000,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })
  }

}
