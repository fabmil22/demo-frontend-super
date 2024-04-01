import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SuperherosListComponent } from './superheros-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperhoresService } from '../../../core/services/superhores.service';
import { SuperPowersService } from '../../../core/services/super-powers.service';
import { async, delay, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Superhero } from '../../../core/models/superheros.interface';
import { MatTableDataSource } from '@angular/material/table';

describe('SuperherosListComponent', () => {
  let component: SuperherosListComponent;
  let fixture: ComponentFixture<SuperherosListComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let service: SuperhoresService;
  let paginator: jasmine.SpyObj<MatPaginator>;
  let sort: jasmine.SpyObj<MatSort>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const paginatorSpy = jasmine.createSpyObj('MatPaginator', ['length']);
    const sortSpy = jasmine.createSpyObj('MatSort', ['']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useClass: RouterMock },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: SuperhoresService, useClass: SuperheroesServiceMock },
        { provide: MatPaginator, useValue: paginatorSpy },
        { provide: MatSort, useValue: sortSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperherosListComponent);
    component = fixture.componentInstance;
    paginator = TestBed.inject(MatPaginator) as jasmine.SpyObj<MatPaginator>;
    sort = TestBed.inject(MatSort) as jasmine.SpyObj<MatSort>;
    service = TestBed.inject(SuperhoresService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch superheroes and initialize dataSource correctly', fakeAsync(() => {
    const mockSuperheroes: Superhero[] = [
      { id: '1', name: 'Flash', secretIdentity: 'Barry Allen', superpowers: ['Super speed'] },
      { id: '2', name: 'Batman', secretIdentity: 'Bruce Wayne', superpowers: ['Richness'] }
    ];

    spyOn(service, 'getSuperheroes').and.returnValue(of(mockSuperheroes));
    expect(component.showLoader).toBeTrue();
    component.ngAfterViewInit();
    tick(3000);

    expect(component.superheroes).toEqual(mockSuperheroes);
    expect(component.showLoader).toBeFalse();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(mockSuperheroes);
  }));
});


const mockActivatedRoute = {
  paramMap: of({ get: () => '1' }),
};
const mockRouter = { navigate: () => { } };

class SuperheroesServiceMock {
  create(hero: any) {
    return of({});
  }
  getHeroById(id: any) {
    return of({});
  }
edit(id: any) {
    return of({});
  }
  upload(image: any) {
    return of({});
  }
  getSuperheroes() {
    return of(mockHeroes);
  }
}

class RouterMock {
  navigate(commands: any[]) { }
}

const mockHeroes: any[] = [
  {
    "id": "1",
    "name": "flash",
    "secretIdentity": "kevin",
    "superpowers": [
      "super velocidad"
    ]

  },
  {
    "id": "2",
    "name": "Hertyn",
    "secretIdentity": "kere",
    "superpowers": [
      "super fuerza"
    ]

  }];
