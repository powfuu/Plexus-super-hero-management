import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilService],
    });
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateRandomId', () => {
    it('should generate a random id within the specified range', () => {
      const id = service.generateRandomId();
      expect(id).toBeGreaterThan(10000);
      expect(id).toBeLessThan(99999);
    });

    it('should generate different ids on consecutive calls', () => {
      const id1 = service.generateRandomId();
      const id2 = service.generateRandomId();
      expect(id1).not.toEqual(id2);
    });
  });
});
