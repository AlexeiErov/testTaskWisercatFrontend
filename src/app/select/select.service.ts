import { Injectable } from '@angular/core';
import { Comparator } from '../selectors/comparator';
import { Type } from '../selectors/type';


@Injectable({
  providedIn: 'root'
})
export class SelectService {

  getTypes(): Type[] {
    return [
      new Type(1, 'Number'),
      new Type(2, 'Text'),
      new Type(3, 'Date')
    ];
  }

  getComparators(): Comparator[] {
    return [
      new Comparator(1, 1, '>'),
      new Comparator(2, 1, '<'),
      new Comparator(3, 2, 'contains'),
      new Comparator(4, 2, 'start at'),
      new Comparator(5, 3, 'start'),
      new Comparator(6, 3, 'deadline')
    ]
  }
}
