import { Component } from '@angular/core';
import { LoadingService } from '../../shared/services/loading/loading.service';
import { take } from 'rxjs';

@Component({
  selector: 'loading-component',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading$ = this.loadingService.getLoaderState();
  loadingText: string = '';

  constructor(private loadingService: LoadingService) {
    this.loadingService
      .getLoaderText()
      .pipe(take(1))
      .subscribe((text) => (this.loadingText = text));
  }
}
