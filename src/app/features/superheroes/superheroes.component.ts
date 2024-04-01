import { Component } from '@angular/core';
import { SuperherosListComponent } from './superheros-list/superheros-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-superheroes',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './superheroes.component.html',
  styleUrl: './superheroes.component.scss'
})
export class SuperheroesComponent {

}
