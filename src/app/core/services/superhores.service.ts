import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';
import { Superhero } from '../models/superheros.interface';

const url = 'http://localhost:3000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class SuperhoresService {


  constructor(private http: HttpClient) { }

  getHeroById(id: number): Observable<any> {
    return this.http.get<Superhero>(`${url}superheroes/${id}`)
  }

  getSuperheroes(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(`${url}superheroes`);
  }

  create(data: Superhero , fileNameImagen: string) {
    data.image = fileNameImagen;
    return this.http.post(`${url}superheroes`, data);
  }

  edit(id: any, data: Superhero) {
    return this.http.patch(`${url}superheroes/${id}`, data);
  }

  upload(file: File): any {
    if (file instanceof Blob) {
      const formData: FormData = new FormData();
      formData.append('file', file, file?.name); // Aquí asegúrate de que file sea un File válido
      return this.http.post<any>(`${url}superheroes/upload`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
  }


  delete(id: any) {
    return this.http.delete(`${url}superheroes/${id}`);
  }

}
