import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('startLoader', () => {
    it('should start loader and set loader text', () => {
      const text = 'Test Loading';
      service.startLoader(text);
      service.getLoaderState().subscribe((isLoading) => {
        expect(isLoading).toBe(true);
      });
      service.getLoaderText().subscribe((loaderText) => {
        expect(loaderText).toBe(text);
      });
    });
  });

  describe('stopLoader', () => {
    it('should stop loader and clear loader text', () => {
      service.startLoader('Test Loading');
      service.stopLoader();
      service.getLoaderState().subscribe((isLoading) => {
        expect(isLoading).toBe(false);
      });
      service.getLoaderText().subscribe((loaderText) => {
        expect(loaderText).toBe('');
      });
    });
  });
});
