import { Injectable ,  ElementRef, inject  } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export const loaderInterceptor: HttpInterceptorFn =
  (request: HttpRequest<any>, next: HttpHandlerFn): Observable < HttpEvent <unknown> > => {
    showLoader();
    return next(request).pipe(
      finalize(() => {
      hideLoader();
      })
    );
  }

  function showLoader(): void {
   console.log('Mostrando loader...');
  }

  function hideLoader(): void {
    console.log('Ocultando loader...');
  }



