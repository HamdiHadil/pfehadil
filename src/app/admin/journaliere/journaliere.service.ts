import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Journaliere } from './journaliere';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JournaliereService {
  constructor(private afs : AngularFirestore) { }
  create(journaliere : Journaliere) {
    journaliere.id = this.afs.createId();
    return this.afs.collection('/journaliers').add(journaliere)
  }
  
  fetchTodaysIrrigationData(): Observable<Journaliere[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return this.afs.collection<Journaliere>('planifications', ref =>
      ref.where('start', '==', today)
    ).valueChanges();
  }
  
 
}
