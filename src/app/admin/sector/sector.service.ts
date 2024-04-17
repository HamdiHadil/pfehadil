import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Sector} from "./sector";


@Injectable({
  providedIn: 'root'
})
export class SectorService {
  constructor(private afs : AngularFirestore) { }

  // add student
  create(sector : Sector) {

    sector.id = this.afs.createId();
    return this.afs.collection('/sectors').add(sector)
  }

  fetchAll() {
    return this.afs.collection('/sectors').snapshotChanges();
  }

  delete(id : string) {
    return  this.afs.doc('/sectors/'+id).delete();
  }

  update(id: string, sector: Sector) {
    return this.afs.doc('/sectors/' + id).update(sector);
  }
}
