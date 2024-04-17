import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Product} from "./product";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private afs : AngularFirestore) { }

  // add student
  create(product : Product) {

    product.id = this.afs.createId();
    return this.afs.collection('/products').add(product)
  }

  fetchAll() {
    return this.afs.collection('/products').snapshotChanges();
  }

  delete(id : string) {
    return  this.afs.doc('/products/'+id).delete();
  }

  update(id: string, product: Product) {
    return this.afs.doc('/products/' + id).update(product);
  }
}
