import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { AdminRoutes } from './admin.routing';

// ui components

import { MatNativeDateModule } from '@angular/material/core';
import { ProductComponent } from "./product/product.component";
import { ProductDialogComponent } from "./product/product-dialog.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { TreatmentDialogComponent } from "./treatment/treatment-dialog.component";
import { SectorComponent } from "./sector/sector.component";
import { SectorDialogComponent } from "./sector/sector-dialog.component";
import { OuvrierComponent } from './ouvrier/ouvrier.component';
import { OuvrierDialogComponent } from './ouvrier/ouvrier-dialog.component';
import { FarmerDialogComponent } from './farmer/farmer-dialog.component';
import { FarmerComponent } from './farmer/farmer.component';
import { PlanificationComponent } from './planification/planification.component';
import { PlanificationDialogComponent } from './planification/planification-dialog.component';
import { JournaliereComponent } from './journaliere/journaliere.component';
import { AddJournaliereComponent } from './Addjournaliere/add-journaliere.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [
    SectorComponent,
    SectorDialogComponent,
    ProductComponent,
    ProductDialogComponent,
    TreatmentComponent,
    TreatmentDialogComponent,
    OuvrierComponent,
    OuvrierDialogComponent,
    FarmerDialogComponent,
    FarmerComponent,
    PlanificationComponent,
    PlanificationDialogComponent,
    JournaliereComponent,
    AddJournaliereComponent




  ],
})
export class AdminModule {
}
