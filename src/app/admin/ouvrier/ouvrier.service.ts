import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ouvrier } from './ouvrier';



@Injectable({
  providedIn: 'root'
})
export class OuvrierService {
  constructor(private afs : AngularFirestore) { }

  // add student
  create(ouvrier : Ouvrier) {

    ouvrier.id = this.afs.createId();
    return this.afs.collection('/ouvriers').add(ouvrier)
  }

  fetchAll() {
    return this.afs.collection('/ouvriers').snapshotChanges();
  }

  delete(id : string) {
    return  this.afs.doc('/ouvriers/'+id).delete();
  }

  update(id: string, ouvrier: Ouvrier) {
    return this.afs.doc('/ouvriers/' + id).update(ouvrier);
  }
}
