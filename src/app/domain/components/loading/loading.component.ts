import { Component } from '@angular/core';
import { LoadingService } from '../../shared/services/utils/loading/loading.service';

@Component({
  selector: 'loading-component',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading$ = this.loadingService.getLoaderState();

  constructor(private loadingService: LoadingService) {}
}
