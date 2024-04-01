import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperhoresService } from './superhores.service';
import { Superhero } from '../models/superheros.interface';
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


const mockSuperhero: any = {
  name: 'Superhero Name',
  secretIdentity: 'Secret Identity',
  superpowers: ['Superpower 1', 'Superpower 2'],

};


const mockHeroes: Superhero[] = [
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
const heroId = 1;
const mockError = new HttpErrorResponse({
  error: 'Error fetching hero',
  status: 404,
  statusText: 'Not Found'
});

describe('SuperhoresService', () => {
  let service: SuperhoresService;
  let httpMockController: HttpTestingController;
  let httpMock: jasmine.SpyObj<HttpClient>;
  let url = 'http://localhost:3000/api/v1/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SuperhoresService);
    httpMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpMockController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMockController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a hero by id', fakeAsync(() => {
    const mockResponse = of(mockHeroes[1]);

    // Simulamos la respuesta HTTP
    const httpMock = TestBed.inject(HttpClient);
    spyOn(httpMock, 'get').and.returnValue(mockResponse);

    service.getHeroById(heroId).subscribe(response => {
      expect(response).toBe(mockHeroes[1]);
    });
  }));

  it('should get all superheroes', fakeAsync(() => {
    const mockResponse = of(mockHeroes);
    const httpMock = TestBed.inject(HttpClient);
    spyOn(httpMock, 'get').and.returnValue(mockResponse);

    service.getSuperheroes().subscribe(response => {
      expect(response).toEqual(mockHeroes);
    });
  }));

  describe('create', () => {

    it('should send a PATCH request to edit a superhero', fakeAsync(() => {
      const mockId = '1';
      const mockData: Superhero = {
        id: '1',
        name: 'Superman',
        secretIdentity: 'Clark Kent',
        superpowers: ['Flight', 'Super strength']
      };

      const mockResponse: Superhero = { ...mockData, name: 'Updated Superman' }; // Mock response data

      // Llamar a la función edit del servicio
      service.edit(mockId, mockData).subscribe((response: any) => {
        expect(response).toEqual(mockResponse); // Verificar que la respuesta sea la esperada
      });

      const req = httpMockController.expectOne(`${url}superheroes/${mockId}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(mockData);
      req.flush(mockResponse);
    }));


    it('should delete a superhero by ID', fakeAsync(() => {
      const id = 1;
      const expectedResult = { message: 'Superhero deleted successfully' };
      service.delete(id).subscribe(response => {
        expect(response).toEqual(expectedResult);
      });
      const req = httpMockController.expectOne(`${url}superheroes/${id}`);
      expect(req.request.method).toBe('DELETE');

      req.flush(expectedResult);
    }));

    it('should upload file successfully', fakeAsync(() => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      let actualResponse: any;

      service.upload(mockFile).subscribe((response: any) => {
        actualResponse = response;
      });

      const req = httpMockController.expectOne(`${url}superheroes/upload`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTruthy();
      expect(req.request.body.has('file')).toBeTruthy();
      expect(req.request.body.get('file')).toEqual(mockFile);

      req.flush({}); // Simulate a successful response from the server

      tick(); // Advance the clock to simulate the asynchronous passage of time

      expect(actualResponse).toBeTruthy();
    }));
  });
})

const heroformMock: any = { name: 'Superman', secretIdentity: 'Clark Kent', superpowers: ['Flight', 'Super strength', 'Heat vision'], image: 'superman.jpg' };
const hero: any = { id: 1, name: 'Superman', secretIdentity: 'Clark Kent', superpowers: ['Flight', 'Super strength', 'Heat vision'], image: 'superman.jpg' };

