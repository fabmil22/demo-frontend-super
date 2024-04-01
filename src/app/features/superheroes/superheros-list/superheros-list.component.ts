import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { SuperhoresService } from '../../../core/services/superhores.service';
import { Superhero } from '../../../core/models/superheros.interface';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, delay, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { DataTableComponent } from '../../../shares/components/data-table/data-table.component';
import { CapitalizePipe } from '../../../shares/pipes/capitalize.pipe';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatDialogDeleteComponent } from '../../../shares/components/mat-dialog-delete/mat-dialog-delete.component';
import { ToastrService } from 'ngx-toastr';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-superheros-list',
  standalone: true,
  imports: [CommonModule,
    CapitalizePipe, MatDialogDeleteComponent,
    MatCardModule, MatTableModule,MatSortModule,
    MatInputModule, DataTableComponent,
    MatFormFieldModule, MatIconModule,
    MatDialogModule, MatButtonModule,
    MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './superheros-list.component.html',
  styleUrl: './superheros-list.component.scss'
})
export class SuperherosListComponent implements AfterViewInit{
  showLoader = false;
  superheroes!: Superhero[];
  displayedColumns: string[] = ['id', 'name', 'secretIdentity', 'superpowers', 'edit', 'delete'];
  dialog = inject(MatDialog)
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize: any;

  dataSource : any;

  @ViewChild(MatSort, { static: false }) sort!: MatSort


  sortChangelist(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this._liveAnnouncer.announce('Sorting removed');
    }
  }

  ngAfterViewInit() {
     this.loaderInfo();
  }

  constructor(private superheroesService: SuperhoresService,
    private router: Router,
    private toastr: ToastrService, private _liveAnnouncer : LiveAnnouncer
    ) {}

    ngOnInit() {
      this.loaderInfo();
    }


    loaderInfo() {
    this.showLoader = true;
    this.superheroesService.getSuperheroes().pipe(
      delay(3000),
      takeUntil(this.destroy$)
    )
      .subscribe(superheroes => {
        this.superheroes = superheroes;
        this.dataSource = new MatTableDataSource<Superhero>(this.superheroes);
        if (this.sort && this.paginator) {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }

        this.dataSource.filterPredicate = (data: any , filterValue: any) => {
          const filterText = filterValue.toLowerCase();
          return data.name.toLowerCase().includes(filterText);
        }
        this.showLoader = false;
      });
  }

  gotoHero(idhero: any) {
     this.router.navigate(['edit/', idhero]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
  }

  capitalizeWord(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  openDialog(id: any) {
    const dialogRef = this.dialog.open(MatDialogDeleteComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (result.delete) {
        this.superheroesService.delete(id).subscribe(() => {
          this.showSuccess();
          this.loaderInfo();
        }
          )
      }
    })
  }
  showSuccess() {
    const message = 'ha sido eliminado el super Heroe';
    this.toastr.success(message);
  }

}

