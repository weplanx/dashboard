import {Pipe, PipeTransform} from '@angular/core';
import {isArray, isObject} from 'util';

@Pipe({name: 'EmptyObject'})
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any): boolean {
    try {
      if (isObject(value) && !isArray(value)) {
        return Object.keys(value).length === 0;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
