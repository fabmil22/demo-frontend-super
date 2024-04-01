import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { SuperPowersService } from './super-powers.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const mockPowers = [
  { id: 1, name: 'volar' },
  { id: 2, name: 'Super fuerza' }
];
const url = 'http://localhost:3000/api/v1/powers';

describe('SuperPowersService', () => {
  let service: SuperPowersService;
  let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      service = TestBed.inject(SuperPowersService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should fetch powers', () => {

      const mockResponse = of(mockPowers);
      const httpMock = TestBed.inject(HttpClient);
      spyOn(httpMock, 'get').and.returnValue(mockResponse);

      service.getPowers().subscribe(response => {
        expect(response).toEqual(mockPowers);
      });
    });
 });

