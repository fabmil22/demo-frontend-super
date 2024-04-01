import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe( catchError(handlerError ))
};

const handlerError = (error : HttpErrorResponse) => {
  const errorResponse = `Error status :${error.status} , message: ${error.message}`;
  return throwError(()=> errorResponse)
}
