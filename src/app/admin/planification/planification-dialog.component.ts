import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sector} from "../sector/sector";
import {SectorService} from "../sector/sector.service";
import { PlanificationService } from './planification.service';
import { Planification } from './planification';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './planification-dialog.component.html',
})
export class PlanificationDialogComponent implements OnInit {
  sectors: Sector[] = [];
  planificationForm = this.fb.group({
    sector: [this.data. planification? this.data.planification.sector : '', [Validators.required,]],
    start: [this.data.planification ? this.data.planification.start : '', [Validators.required,]],
    end: [this.data.planification ? this.data.planification.end : '', [Validators.required,]],
    ho: [this.data.planification ? this.data.planification.ho : '', [Validators.required,]],
    et: [this.data.planification ? this.data.planification.et : '', [Validators.required,]]
  })

  constructor(private fb: FormBuilder, private planificationService: PlanificationService, public dialogRef: MatDialogRef<PlanificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { planification?: Planification, sectors: Sector[] }, private sectorService: SectorService) {}

  ngOnInit(): void {
    this.sectors = this.data.sectors;
  }

  private planification(): Planification {
    return {
      ...new Planification(),
      id: this.data.planification ? this.data.planification.id : '',
      sector: this.planificationForm.get(['sector'])!.value,
      start: this.planificationForm.get(['start'])!.value,
      end: this.planificationForm.get(['end'])!.value,
      ho: this.planificationForm.get(['ho'])!.value,
      et: this.planificationForm.get(['et'])!.value,
    };
  }
  onSubmit() {
    if (this.planificationForm.valid) {
      const sector: Planification = this.planification()
      if (this.data.planification && this.data.planification.id) {
        // Update existing sector
        this.planificationService.update(this.data.planification.id, sector).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.planificationService.create(sector).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
