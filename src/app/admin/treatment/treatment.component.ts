import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TreatmentDialogComponent} from "./treatment-dialog.component";
import {Treatment} from "./treatment";
import {TreatmentService} from "./treatment.service";
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";
import { Sector } from '../sector/sector';
import { SectorService } from '../sector/sector.service';

@Component({
  selector: 'app-sector',
  templateUrl: './treatment.component.html'
})
export class TreatmentComponent implements OnInit {
  displayedColumns: string[] = [ 'se','products','qte','te','start','end','action',];
  treatments: Treatment[] = [];
  products: Product[] = [];
 
  
  constructor(public dialog: MatDialog, private treatmentService: TreatmentService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.fetchAll()
    this.fetchProducts()
    
  }

  fetchAll() {
    this.treatmentService.fetchAll().subscribe({
      next: (r) => {
        this.treatments = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          console.log(data)
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching treatments');
      }
    })
  }

  fetchProducts() {
    this.productService.fetchAll().subscribe({
      next: (r) => {
        this.products = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching products');
      }
    })
  }

  getProductName(id: string): string | undefined {
    const product = this.products.find(s => s.id === id);
    return product ? product.name : undefined;
  }

  delete(id: string) {
    this.treatmentService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(treatment: Treatment) {
    const dialogRef = this.dialog.open(TreatmentDialogComponent, {
      width: '500px',
      data: {
        treatment,
        products: this.products
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TreatmentDialogComponent, {
      width: '500px',
      data: {
        products: this.products
      }
    });
  }


 
}