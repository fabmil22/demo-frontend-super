import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesComponent } from './superheroes.component';

describe('SuperheroesComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperheroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperheroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
