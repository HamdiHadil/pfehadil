import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Planification } from './planification';
@Injectable({
  providedIn: 'root'
})
export class PlanificationService {
  constructor(private afs : AngularFirestore) { }
  create(planification : Planification) {
    planification.id = this.afs.createId();
    return this.afs.collection('/planifications').add(planification)
  }
  fetchAll() {
    return this.afs.collection('/planifications').snapshotChanges();
  }
  delete(id : string) {
    return  this.afs.doc('/planifications/'+id).delete();
  }
  update(id: string, planification: Planification) {
    return this.afs.doc('/planifications/' + id).update(planification);
  }
 
}
