import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { user } from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore, doc, getDoc} from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  
  //-----AUTH-----

  getAuth(){
    return getAuth();
  }

  signIn(user: user){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //-----SIGN-UP-----

  signUp(user: user){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //-----SIGN OUT-----
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('');
  }

  //-------UPDATE USER-----
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }

  //----- SEND EMAIL TO RECOVERY PASSWORD-----
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  //--------DATA BASE FIRESTORE--------
    //----- Set Document--------
    setDocument(path: string, data: any){
      return setDoc(doc(getFirestore(), path), data);
      
    }

    //------Get Document--------
    async getDocument(path: string){
      return (await getDoc(doc(getFirestore(), path))).data();
    }

  

}
