import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show a notification', () => {
    spyOn(snackBar, 'open');
    const message = 'Test message';
    service.showNotification(message);
    expect(snackBar.open).toHaveBeenCalledWith(message, 'Close', {
      duration: 2500,
    });
  });
});
