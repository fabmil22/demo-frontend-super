import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shares/components/page-not-found/page-not-found.component';
import { GaleryComponent } from './features/galery/galery.component';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./features/superheroes/superheros.routes').then(m=> m.SUPER_ROUTES )
  },
  {
    path: 'galery',
    component: GaleryComponent
  },
  {path: '**', component: PageNotFoundComponent}
];
