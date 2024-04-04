import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateObjectComponent } from 'src/app/shared/components/add-update-object/add-update-object.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  ngOnInit() {
  }

  //------SIGN OUT------
  signOut(){
    this.firebaseSvc.signOut();
  }

  //------ADD UPDATE OBJECT-------
  addUpdateObject(){
    this.utilsSvc.presentModal({
      component: AddUpdateObjectComponent,
      cssClass: 'add-update-modal'
    })
  }

}
