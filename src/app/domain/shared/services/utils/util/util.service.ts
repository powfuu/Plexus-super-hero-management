import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  //se genera un mock de id random para cada heroe
  generateRandomId = (): number => {
    const min = 10000;
    const max = 99999;
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id;
  };
}
