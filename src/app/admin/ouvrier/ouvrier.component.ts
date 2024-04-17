import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SectorService} from "../sector/sector.service";
import {Sector} from "../sector/sector";
import { Ouvrier } from './ouvrier';
import { OuvrierService } from './ouvrier.service';
import { OuvrierDialogComponent } from './ouvrier-dialog.component'; // Correction ici

@Component({
  selector: 'app-sector',
  templateUrl: './ouvrier.component.html'
})
export class OuvrierComponent implements OnInit {
  displayedColumns: string[] = ['sector', 'sex','nbr','action'];
  ouvriers: Ouvrier[] = [];
  sectors: Sector[] = [];

  constructor(public dialog: MatDialog, private ouvrierService: OuvrierService, private sectorService: SectorService) {
  }

  ngOnInit(): void {
    this.fetchAll();
    this.fetchSectors();
  }

  fetchAll() {
    this.ouvrierService.fetchAll().subscribe({
      next: (r) => {
        this.ouvriers = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          console.log(data);
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching ouvriers');
      }
    });
  }

  fetchSectors() {
    this.sectorService.fetchAll().subscribe({
      next: (r) => {
        this.sectors = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching sectors');
      }
    });
  }

  getSectorName(id: string): string | undefined {
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }

  delete(id: string) {
    this.ouvrierService.delete(id).then(r => {
      this.fetchAll();
    });
  }

  update(ouvrier: Ouvrier) {
    const dialogRef = this.dialog.open(OuvrierDialogComponent, {
      width: '500px',
      data: {
        ouvrier,
        sectors: this.sectors
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(OuvrierDialogComponent, {
      width: '500px',
      data: {
        sectors: this.sectors
      }
    });
  }
}
