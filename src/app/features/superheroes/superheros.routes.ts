import { Routes } from "@angular/router";
import { SuperherosListComponent } from "./superheros-list/superheros-list.component";
import { SuperheroesComponent } from "./superheroes.component";
import { SuperherosEditComponent } from "./superheros-edit/superheros-edit.component";


export const SUPER_ROUTES : Routes =[
  {
      path: '', component: SuperheroesComponent, children: [
          { path: '', component: SuperherosListComponent},
          { path: 'add', component: SuperherosEditComponent },
          { path: 'edit/:id', component: SuperherosEditComponent }
      ]
  }
];

