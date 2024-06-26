import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseSvc = inject(FirebaseService)

  constructor() { }

  ngOnInit() {
  }

  //------SIGN OUT------
  signOut(){
    this.firebaseSvc.signOut();
  }

}
