import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-object',
  templateUrl: './add-update-object.component.html',
  styleUrls: ['./add-update-object.component.scss'],
})
export class AddUpdateObjectComponent  implements OnInit {

  
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    image: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.min(0)]),
    soldUnits: new FormControl("", [Validators.required, Validators.min(0)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  //------SELECT IMAGE/TAKE PHOTO-------
  async takeImage(){
    const dataUrl = (await this.utilsSvc.takePicture('Product image')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async submit(){
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signUp(this.form.value as user).then(async res =>{

        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;

      }).catch(error => {

        console.log(error);
        
        this.utilsSvc.presentToast({
          message: 'Email have already exist',
          duration: 4000,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })

      }).finally(()=>{
        loading.dismiss();
      })
    }
  }

}
