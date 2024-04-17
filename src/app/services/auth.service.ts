import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat';
import {Farmer} from "../admin/farmer/farmer";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signUp(farmer: Farmer) {
    try {
      if (farmer.email && farmer.password) {
        const credential = await this.afAuth.createUserWithEmailAndPassword(farmer.email, farmer.password);
        await this.signIn('hadilhamdi@gmail.com', 'aaaaaa')
        await this.updateUserData(credential.user, farmer); // create user document in Firestore
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }


  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async updateUserData(user: firebase.User | null, farmer: Farmer) {
    // Sets user data to firestore on login
    if (user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data = {
        uid: user.uid,
        email: user.email,
        fName: farmer.fName,
        lName: farmer.lName,
        phone: farmer.phone,
        roles: {
          farmer: true
        }
      };
      await userRef.set(data, {merge: true});
    }
  }

  // Check if user is admin
  async isAdmin(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (!user) return false;

    const userData = await this.afs.doc<any>(`users/${user.uid}`).valueChanges().toPromise();
    return !!userData && userData.roles.admin;
  }
}
