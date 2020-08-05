import { Pipe, PipeTransform } from '@angular/core';
import { objectToArray } from '../operates/object-to-array';

@Pipe({ name: 'ObjectToArray' })
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return objectToArray(value);
  }
}