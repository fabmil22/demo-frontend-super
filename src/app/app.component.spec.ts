import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

 const mockActivatedRoute = {
  paramMap: of({
    get: (param: string) => param === 'id' ? '1' : null
  })
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers:	[ { provide: ActivatedRoute, useValue: mockActivatedRoute },]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
