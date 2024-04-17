import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sector} from "../sector/sector";
import {SectorService} from "../sector/sector.service";
import { OuvrierService } from './ouvrier.service';
import { Ouvrier } from './ouvrier';

@Component({
  selector: 'app-ouvrier-dialog', // Correction ici
  templateUrl: './ouvrier-dialog.component.html',
})
export class OuvrierDialogComponent implements OnInit { // Correction ici
  sectors: Sector[] = [];
  ouvrierForm = this.fb.group({
    sector: [this.data.ouvrier ? this.data.ouvrier.sector : '', [Validators.required,]],
    sex: [this.data.ouvrier ? this.data.ouvrier.sex : '', [Validators.required,]],
    nbr: [this.data.ouvrier ? this.data.ouvrier.nbr : '', [Validators.required,]],

   
  })

  constructor(private fb: FormBuilder, private ouvrierService: OuvrierService, public dialogRef: MatDialogRef<OuvrierDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    qty: any; ouvrier?: Ouvrier, sectors: Sector[] 
}, private sectorService: SectorService) {}

  ngOnInit(): void {
    this.sectors = this.data.sectors;
  }

  private ouvrier(): Ouvrier {
    return {
      ...new Ouvrier(),
      id: this.data.ouvrier ? this.data.ouvrier.id : '',
      sector: this.ouvrierForm.get(['sector'])!.value,
      sex: this.ouvrierForm.get(['sex'])!.value,
    nbr: this.ouvrierForm.get(['nbr'])!.value,
     
      
    };
  }
  onSubmit() {
    if (this.ouvrierForm.valid) {
      const sector: Ouvrier = this.ouvrier()
      if (this.data.ouvrier && this.data.ouvrier.id) {
        // Update existing sector
        this.ouvrierService.update(this.data.ouvrier.id, sector).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.ouvrierService.create(sector).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
