import { Component, OnInit } from '@angular/core';
import { SectorService } from "../sector/sector.service";
import { Sector } from "../sector/sector";
import { JournaliereService } from './journaliere.service';

import { Journaliere } from './journaliere';

@Component({
  selector: 'app-sector',
  templateUrl: './journaliere.component.html'
})
export class JournaliereComponent implements OnInit {
  displayedColumns: string[] = ['sector', 'start', 'end', 'ho', 'et','action'];
  planifications: Journaliere[] = [];
  sectors: Sector[] = [];
  journaliereService: any;
  journaliers: any;

  constructor(
   
    private planificationService: JournaliereService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.fetchAll();
    this.fetchSectors();
    this.loadTodaysIrrigationData();
  }

  fetchAll() {
    this.journaliereService.fetchAll().subscribe({
      next: (r: any[]) => {
        this.journaliers = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: () => {
        console.log('Error while fetching planifications');
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
  loadTodaysIrrigationData() {
    this.journaliereService.fetchTodaysIrrigationData().subscribe({
      next: (data: Journaliere[]) => {
        this.journaliers = data;
      },
      error: () => {
        console.log('Error while fetching today\'s irrigation data');
      }
    });
  }

 
  

 
  }


  
  

