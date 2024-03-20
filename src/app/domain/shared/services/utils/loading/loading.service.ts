import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);

  constructor() {}

  startLoader(): void {
    this.isLoading.next(true);
  }

  stopLoader(): void {
    this.isLoading.next(false);
  }

  getLoaderState(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
