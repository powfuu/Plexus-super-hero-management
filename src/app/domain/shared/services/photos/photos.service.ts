import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor() {}
  //TODO: EL PROPOSITO DE ESTE SERVICE ES MANEJAR LAS IMGS Y OPTIMIZARLAS LO MAS POSIBLE PARA ESTE PROYECTO PEQUEÑO
  previewImage(
    event: any,
    maxWidth: number = 100,
    maxHeight: number = 100,
    quality: number = 0.35 //calidad 35%
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file = event.target.files[0];
      if (!file) {
        reject('No se ha seleccionado ningún archivo.');
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const dataURL = canvas.toDataURL(file.type, quality);
          resolve(dataURL);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}
