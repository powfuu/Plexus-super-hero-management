import { TestBed } from '@angular/core/testing';
import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotosService],
    });
    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('previewImage', () => {
    it('should reject if no file is selected', (done: DoneFn) => {
      const event = {
        target: { files: [] },
      };
      service.previewImage(event).catch((error) => {
        expect(error).toBe('No se ha seleccionado ningún archivo.');
        done();
      });
    });
  });
});
