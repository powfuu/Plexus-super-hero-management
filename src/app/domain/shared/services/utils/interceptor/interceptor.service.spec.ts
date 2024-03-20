import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { Interceptor } from './interceptor.service';

describe('Interceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: Interceptor,
          multi: true,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    dialog = TestBed.inject(MatDialog);
  });

  it('should intercept HTTP request', () => {
    httpClient.get('/api/data').subscribe();
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
  });
});
