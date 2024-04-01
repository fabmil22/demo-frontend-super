import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';
import { SuperhoresService } from '../../core/services/superhores.service';
import { Superhero } from '../../core/models/superheros.interface';
import {MatChipsModule} from '@angular/material/chips';
import { CapitalizePipe } from '../../shares/pipes/capitalize.pipe';


@Component({
  selector: 'app-galery',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, CapitalizePipe,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss'
})
export class GaleryComponent {
  showLoader = false;
  superheroes!: Superhero[];
  constructor(private superheroesService: SuperhoresService) { }

  ngOnInit() {
    this.loaderInfo();
  }

  loaderInfo() {
    this.showLoader = true;
    this.superheroesService.getSuperheroes().pipe(
      delay(1000)
    )
      .subscribe(superheroes => {
        this.superheroes = superheroes;
        this.showLoader = false;
      });

  }

}
