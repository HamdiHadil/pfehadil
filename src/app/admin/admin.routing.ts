import { Routes } from '@angular/router';

// ui
import { SectorComponent } from './sector/sector.component';
import { ProductComponent } from "./product/product.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { OuvrierComponent } from './ouvrier/ouvrier.component';
import { FarmerComponent } from './farmer/farmer.component';
import { PlanificationComponent } from './planification/planification.component';
import { JournaliereComponent } from './journaliere/journaliere.component';
import { AddJournaliereComponent } from './Addjournaliere/add-journaliere.component'





export const AdminRoutes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'sector',
        component: SectorComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'treatment',
        component: TreatmentComponent,
      },
      {
        path: 'ouvrier',
        component: OuvrierComponent,
      },
      {
        path: 'farmer',
        component: FarmerComponent,
      },
      {
        path: 'planification',
        component: PlanificationComponent,
      },
      {
        path: 'journaliere/:id',
        component: JournaliereComponent,
      },
      {
        path: 'add-iregation',
        component: AddJournaliereComponent,
      },








    ],
  },
];
