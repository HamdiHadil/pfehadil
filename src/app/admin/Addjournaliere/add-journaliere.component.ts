import { Component, OnInit } from '@angular/core';
import { SectorService } from "../sector/sector.service";
import { Sector } from "../sector/sector";
import { JournaliereService } from '../journaliere/journaliere.service';
import { PlanificationService } from '../planification//planification.service';
import { Journaliere } from '../journaliere/journaliere';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { Planification } from '../planification/planification';

@Component({
  selector: 'app-journaliere',
  templateUrl: './add-journaliere.component.html'
})
export class AddJournaliereComponent implements OnInit {
  planifications: Planification[] = [];
  sectors: Sector[] = [];
  AddJournaliere!: FormGroup
  datenow = new Date()
  pageSize = 10; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle
  constructor(
    private formBuilder: FormBuilder,
    private planificationService: PlanificationService,
    private sectorService: SectorService,
    private journaliereService: JournaliereService
  ) { }

  ngOnInit(): void {
    this.AddJournaliere = this.formBuilder.group({
      sector: [''],
      planificationId: [''],
      start: [''],
      end: [''],
      ho: [""]

    });
    this.fetchTodaysIrrigationData();
    this.AddJournaliere.patchValue({
      start: this.getCurrentDate(), // Replace with your preferred method to get the current date
      end: this.getCurrentDate()
    })
    // this.loadTodaysIrrigationData();
  }
  formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  fetchTodaysIrrigationData() {
    this.planificationService.fetchTodaysIrrigationData().subscribe({
      next: (r: any[]) => {
        console.log("fetchTodaysIrrigationData", r)
        let dataPlanification = r;
        const startDate = this.formatDate(new Date());
        console.log(startDate)
        dataPlanification = r.filter(el => el.start <= startDate && el.end >= startDate);
        console.log("dataPlanification", dataPlanification)
        this.planifications = dataPlanification;
        //  let sectoreId = r.map(el => el.sector)
        // console.log("fetchTodaysIrrigationData", r)
        //  this.fetchSectors(sectoreId);
      },
      error: (err) => {
        console.log('Error while fetching planifications', err);
      }
    });
  }




  fetchSectors(ids: any) {
    this.sectorService.getDocumentsByArrayField("id", ids).subscribe({
      next: (r: any[]) => {
        this.sectors = r;

      },
      error: (err) => {
        console.log('Error while fetching sectors');
      }
    });
  }

  getSectorName(id: string): string | undefined {
    console.log(this.sectors, id)
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }
  async addJournaliere() {
    console.log(this.AddJournaliere.value)
    const planification = this.planifications.find(el => el._id == this.AddJournaliere.value.planificationId)
    let uiiduser = localStorage.getItem("uiiduser");
    let obj = { ...this.AddJournaliere.value, farmarUid: uiiduser, sector: planification?.sector }
    console.log(obj);
    const result = await this.journaliereService.create(obj)
    console.log(result)
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
}





