import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-fyp',
  templateUrl: './fyp.page.html',
  styleUrls: ['./fyp.page.scss'],
})
export class FypPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  ngOnInit() {
  }

  products: Product[] = [];

  
  user(): user{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  //------GET PRODUCTS IN HOME-----
  getProducts(){
    let path = `users/${this.user().uid}/products`;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.products = res;
        sub.unsubscribe;
      }
    })
  }

  ionViewWillEnter() {
    this.getProducts();
  }



}
