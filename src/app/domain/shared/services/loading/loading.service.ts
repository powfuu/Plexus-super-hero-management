import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private loaderText = new BehaviorSubject<string>('');

  constructor() {}

  startLoader(text: string = 'Loading...'): void {
    this.isLoading.next(true);
    this.setLoaderText(text);
  }

  stopLoader(): void {
    this.isLoading.next(false);
    this.setLoaderText('');
  }

  getLoaderState(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  private setLoaderText(text: string): void {
    this.loaderText.next(text);
  }

  getLoaderText(): Observable<string> {
    return this.loaderText.asObservable();
  }
}
